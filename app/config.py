from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    log_level: str = "INFO"
    default_provider: str = "auto"
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.0-flash"
    mem_palace_base_url: str | None = None
    mem_palace_api_key: str | None = None
    allow_external_actions: bool = False

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
