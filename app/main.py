from fastapi import FastAPI, HTTPException
from .agents import list_agents, plan
from .audit import audit_log
from .config import settings
from .memory import memory_store
from .models import QuickActionRequest, RouteRequest, RouteResponse
from .providers import ProviderUnavailable, route
from .quick_actions import execute, list_actions

app = FastAPI(title="AI Evolutionary Evolutions Agent Platform", version="0.2.0")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "environment": settings.app_env, "external_actions": settings.allow_external_actions}


@app.get("/agents")
async def agents() -> list[dict]:
    return list_agents()


@app.get("/quick-actions")
async def quick_actions() -> list[dict]:
    return list_actions()


@app.get("/audit")
async def audit(limit: int = 100) -> list[dict]:
    return audit_log.recent(limit)


@app.post("/swarm/plan")
async def swarm_plan(agent: str, task: str) -> dict:
    try:
        return plan(agent, task)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Agent is not registered") from exc


@app.post("/quick-actions/execute")
async def run_quick_action(request: QuickActionRequest):
    result = execute(request.action, request.parameters, request.approval_token)
    audit_log.record(request.action, result.status, request.parameters)
    return result


@app.post("/route", response_model=RouteResponse)
async def route_request(request: RouteRequest):
    conversation_id = request.conversation_id or "default"
    context = await memory_store.recall(conversation_id)
    prompt = request.prompt if not context else "Known context:\n" + "\n".join(context[-10:]) + "\n\nUser request:\n" + request.prompt
    try:
        reply = await route(prompt, request.provider)
    except ProviderUnavailable as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    saved = False
    if request.remember:
        await memory_store.save(conversation_id, f"User: {request.prompt}\nAssistant: {reply.answer}")
        saved = True
    return RouteResponse(provider=reply.provider, model=reply.model, answer=reply.answer, memory_saved=saved)
