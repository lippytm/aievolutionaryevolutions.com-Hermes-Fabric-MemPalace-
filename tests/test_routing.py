import pytest
from app import providers


@pytest.mark.asyncio
async def test_route_uses_openai_when_available(monkeypatch):
    async def fake_openai(prompt):
        return providers.ProviderReply("openai", "test-model", "ok")

    monkeypatch.setattr(providers, "_openai", fake_openai)
    result = await providers.route("hello", "openai")
    assert result.answer == "ok"
