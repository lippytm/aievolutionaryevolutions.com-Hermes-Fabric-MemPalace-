from dataclasses import dataclass
from .config import settings
from .models import QuickActionResult


@dataclass(frozen=True)
class ActionDefinition:
    name: str
    description: str
    approval_required: bool
    implemented: bool = False


ACTIONS = {
    "list_memory": ActionDefinition("list_memory", "Recall conversation memory", False, True),
    "create_lesson": ActionDefinition("create_lesson", "Draft a learning lesson", False, True),
    "summarize_repository": ActionDefinition("summarize_repository", "Prepare a repository analysis request", False, True),
    "send_email": ActionDefinition("send_email", "Send an email", True),
    "post_slack": ActionDefinition("post_slack", "Post a Slack message", True),
    "run_zapier": ActionDefinition("run_zapier", "Trigger a Zapier automation", True),
    "write_github": ActionDefinition("write_github", "Create or modify GitHub files", True),
    "deploy": ActionDefinition("deploy", "Deploy a service", True),
    "financial_action": ActionDefinition("financial_action", "Perform a financial action", True),
    "credential_change": ActionDefinition("credential_change", "Change credentials", True),
    "blockchain_transaction": ActionDefinition("blockchain_transaction", "Submit a blockchain transaction", True),
    "destructive_action": ActionDefinition("destructive_action", "Delete or irreversibly alter data", True),
}


def list_actions() -> list[dict]:
    return [definition.__dict__ for definition in ACTIONS.values()]


def execute(action: str, parameters: dict, approval_token: str | None) -> QuickActionResult:
    definition = ACTIONS.get(action)
    if not definition:
        return QuickActionResult(action=action, status="unknown", message="Action is not registered")
    if definition.approval_required and not settings.allow_external_actions:
        return QuickActionResult(action=action, status="disabled", message="External actions are disabled")
    if definition.approval_required and approval_token != "approved-by-user":
        return QuickActionResult(action=action, status="approval_required", message="Explicit approval is required")
    if not definition.implemented:
        return QuickActionResult(action=action, status="disabled", message="Connector is not implemented yet")
    return QuickActionResult(action=action, status="completed", result={"parameters": parameters}, message="Completed")
