from app.quick_actions import execute


def test_external_action_requires_approval():
    result = execute("send_email", {"to": "test@example.com"}, None)
    assert result.status in {"disabled", "approval_required"}


def test_unknown_action_is_safe():
    assert execute("not-real", {}, None).status == "unknown"
