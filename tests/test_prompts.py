from app.prompts import get_prompt


def test_prompt_11_is_safe_and_staged():
    prompt = get_prompt(11)
    assert prompt is not None
    assert "approval-gated" in prompt.template
