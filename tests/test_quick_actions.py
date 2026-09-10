from app.quick_actions import execute, list_actions


def test_external_action_requires_approval():
    result = execute("send_email", {"to": "test@example.com"}, None)
    assert result.status in {"disabled", "approval_required"}


def test_unknown_action_is_safe():
    assert execute("not-real", {}, None).status == "unknown"


def test_lesson_action_returns_structure():
    result = execute("create_lesson", {"topic": "Python"})
    assert result.status == "completed"
    assert result.result["title"] == "Python"


def test_catalog_contains_learning_and_content_actions():
    names = {item["name"] for item in list_actions()}
    assert {"create_video_brief", "create_ebook_outline", "simulate_trade"}.issubset(names)
