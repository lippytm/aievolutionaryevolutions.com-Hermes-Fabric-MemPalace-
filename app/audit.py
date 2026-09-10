from datetime import datetime, timezone
from uuid import uuid4


class AuditLog:
    def __init__(self) -> None:
        self.events: list[dict] = []

    def record(self, action: str, status: str, parameters: dict) -> dict:
        event = {"id": str(uuid4()), "timestamp": datetime.now(timezone.utc).isoformat(), "action": action, "status": status, "parameters": parameters}
        self.events.append(event)
        return event

    def recent(self, limit: int = 100) -> list[dict]:
        return self.events[-limit:]


audit_log = AuditLog()
