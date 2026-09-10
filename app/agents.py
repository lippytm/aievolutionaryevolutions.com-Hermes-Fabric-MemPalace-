from dataclasses import dataclass


@dataclass(frozen=True)
class AgentDefinition:
    name: str
    purpose: str
    preferred_providers: tuple[str, ...]
    allowed_actions: tuple[str, ...]


AGENTS = {
    "architect": AgentDefinition("architect", "Design systems and break work into stages", ("openai", "gemini", "claude"), ("summarize_repository", "create_lesson")),
    "programming_teacher": AgentDefinition("programming_teacher", "Teach programming with examples and exercises", ("gemini", "openai", "claude"), ("create_lesson", "list_memory")),
    "blockchain_teacher": AgentDefinition("blockchain_teacher", "Explain blockchain concepts and simulations", ("claude", "openai", "gemini"), ("create_lesson", "list_memory")),
    "linux_devops": AgentDefinition("linux_devops", "Plan safe Linux and DevOps workflows", ("openai", "claude", "gemini"), ("create_lesson", "summarize_repository")),
    "researcher": AgentDefinition("researcher", "Compare sources and produce structured findings", ("gemini", "claude", "openai"), ("summarize_repository", "list_memory")),
    "release_manager": AgentDefinition("release_manager", "Prepare releases while keeping deployment approval-gated", ("openai", "claude", "gemini"), ("summarize_repository", "write_github", "deploy")),
}


def list_agents() -> list[dict]:
    return [agent.__dict__ for agent in AGENTS.values()]


def plan(agent_name: str, task: str) -> dict:
    agent = AGENTS.get(agent_name)
    if not agent:
        raise KeyError(agent_name)
    return {"agent": agent.name, "task": task, "providers": agent.preferred_providers, "allowed_actions": agent.allowed_actions, "requires_approval_for": ["write_github", "deploy", "send_email", "post_slack", "run_zapier", "financial_action", "credential_change", "blockchain_transaction", "destructive_action"]}
