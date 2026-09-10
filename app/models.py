from typing import Literal
from pydantic import BaseModel, Field


class RouteRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=20000)
    provider: Literal["auto", "openai", "gemini"] = "auto"
    conversation_id: str | None = None
    remember: bool = True


class RouteResponse(BaseModel):
    provider: str
    model: str
    answer: str
    memory_saved: bool = False


class QuickActionRequest(BaseModel):
    action: str
    parameters: dict = Field(default_factory=dict)
    approval_token: str | None = None


class QuickActionResult(BaseModel):
    action: str
    status: Literal["completed", "approval_required", "disabled", "unknown"]
    result: dict = Field(default_factory=dict)
    message: str
