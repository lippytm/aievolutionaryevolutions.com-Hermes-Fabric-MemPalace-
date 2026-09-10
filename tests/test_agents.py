from app.agents import plan


def test_agent_plan_has_approval_boundary():
    result = plan("architect", "Design the next stage")
    assert "write_github" in result["requires_approval_for"]
    assert "create_lesson" in result["allowed_actions"]
