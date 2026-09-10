from dataclasses import dataclass
import httpx
from .config import settings


@dataclass
class Memory:
    conversation_id: str
    text: str


class MemoryStore:
    def __init__(self) -> None:
        self.local: dict[str, list[str]] = {}

    async def save(self, conversation_id: str, text: str) -> None:
        if settings.mem_palace_base_url:
            headers = {"Authorization": f"Bearer {settings.mem_palace_api_key}"} if settings.mem_palace_api_key else {}
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.post(
                    f"{settings.mem_palace_base_url.rstrip('/')}/memories",
                    headers=headers,
                    json={"conversation_id": conversation_id, "text": text},
                )
                response.raise_for_status()
            return
        self.local.setdefault(conversation_id, []).append(text)

    async def recall(self, conversation_id: str, limit: int = 20) -> list[str]:
        if settings.mem_palace_base_url:
            headers = {"Authorization": f"Bearer {settings.mem_palace_api_key}"} if settings.mem_palace_api_key else {}
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.get(
                    f"{settings.mem_palace_base_url.rstrip('/')}/memories/{conversation_id}",
                    headers=headers,
                    params={"limit": limit},
                )
                response.raise_for_status()
                return response.json().get("memories", [])
        return self.local.get(conversation_id, [])[-limit:]


memory_store = MemoryStore()
