from dataclasses import dataclass
from .config import settings
from .models import QuickActionResult


@dataclass(frozen=True)
class ActionDefinition:
    name: str
    description: str
    approval_required: bool
    implemented: bool = False


SAFE_ACTIONS = {
    "list_memory": "Recall conversation memory",
    "create_lesson": "Create a structured lesson plan",
    "summarize_repository": "Prepare a repository analysis plan",
    "explain_step": "Explain the next step in plain language",
    "generate_code_example": "Generate a teaching code example",
    "create_video_brief": "Create a video explainer brief",
    "create_ebook_outline": "Create an ebook outline",
    "create_audiobook_script": "Create an audiobook narration outline",
    "create_chatbot_spec": "Create a chatbot specification",
    "simulate_trade": "Run a non-financial trading simulation plan",
    "create_issue_draft": "Draft a repository issue without publishing it",
    "research_concept": "Prepare a research and comparison plan",
}

GATED_ACTIONS = {
    "send_email": "Send an email",
    "post_slack": "Post a Slack message",
    "run_zapier": "Trigger a Zapier automation",
    "write_github": "Create or modify GitHub files",
    "deploy": "Deploy a service",
    "financial_action": "Perform a financial action",
    "credential_change": "Change credentials",
    "blockchain_transaction": "Submit a blockchain transaction",
    "destructive_action": "Delete or irreversibly alter data",
}

ACTIONS = {name: ActionDefinition(name, description, False, True) for name, description in SAFE_ACTIONS.items()}
ACTIONS.update({name: ActionDefinition(name, description, True, False) for name, description in GATED_ACTIONS.items()})


def list_actions() -> list[dict]:
    return [definition.__dict__ for definition in ACTIONS.values()]


def execute(action: str, parameters: dict, approval_token: str | None = None) -> QuickActionResult:
    definition = ACTIONS.get(action)
    if not definition:
        return QuickActionResult(action=action, status="unknown", message="Action is not registered")
    if definition.approval_required and not settings.allow_external_actions:
        return QuickActionResult(action=action, status="disabled", message="External actions are disabled")
    if definition.approval_required and approval_token != "approved-by-user":
        return QuickActionResult(action=action, status="approval_required", message="Explicit approval is required")
    if not definition.implemented:
        return QuickActionResult(action=action, status="disabled", message="Connector is not implemented yet")

    result = {"parameters": parameters, "side_effects": False}
    if action == "create_lesson":
        result.update({"title": parameters.get("topic", "Untitled lesson"), "steps": ["Explain", "Demonstrate", "Practice", "Review"]})
    elif action == "create_video_brief":
        result.update({"title": parameters.get("topic", "Untitled video"), "scenes": ["Hook", "Concept", "Walkthrough", "Exercise", "Recap"]})
    elif action == "create_ebook_outline":
        result.update({"title": parameters.get("topic", "Untitled ebook"), "chapters": ["Foundations", "Core concepts", "Projects", "Troubleshooting", "Next steps"]})
    elif action == "create_audiobook_script":
        result.update({"title": parameters.get("topic", "Untitled audiobook"), "sections": ["Opening", "Lesson", "Example", "Reflection", "Closing"]})
    elif action == "simulate_trade":
        result.update({"warning": "Simulation only; no financial action is performed", "asset": parameters.get("asset"), "rules": parameters.get("rules", [])})
    elif action == "create_issue_draft":
        result.update({"title": parameters.get("title", "Draft issue"), "body": parameters.get("body", ""), "publish": False})
    return QuickActionResult(action=action, status="completed", result=result, message="Completed safely without external side effects")
