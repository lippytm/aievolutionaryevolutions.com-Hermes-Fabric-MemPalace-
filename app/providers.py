from dataclasses import dataclass
import httpx
from .config import settings


@dataclass
class ProviderReply:
    provider: str
    model: str
    answer: str


class ProviderUnavailable(RuntimeError):
    pass


async def _openai(prompt: str) -> ProviderReply:
    if not settings.openai_api_key:
        raise ProviderUnavailable("OpenAI is not configured")
    headers = {"Authorization": f"Bearer {settings.openai_api_key}"}
    payload = {"model": settings.openai_model, "messages": [{"role": "user", "content": prompt}]}
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
    return ProviderReply("openai", settings.openai_model, data["choices"][0]["message"]["content"])


async def _gemini(prompt: str) -> ProviderReply:
    if not settings.gemini_api_key:
        raise ProviderUnavailable("Gemini is not configured")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.gemini_model}:generateContent"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(url, params={"key": settings.gemini_api_key}, json=payload)
        response.raise_for_status()
        data = response.json()
    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return ProviderReply("gemini", settings.gemini_model, text)


async def route(prompt: str, provider: str = "auto") -> ProviderReply:
    selected = settings.default_provider if provider == "auto" else provider
    candidates = [selected] if selected != "auto" else ["openai", "gemini"]
    errors: list[str] = []
    for candidate in candidates:
        try:
            return await (_openai(prompt) if candidate == "openai" else _gemini(prompt))
        except (ProviderUnavailable, httpx.HTTPError, KeyError) as exc:
            errors.append(f"{candidate}: {exc}")
    raise ProviderUnavailable("No configured provider is available: " + "; ".join(errors))
