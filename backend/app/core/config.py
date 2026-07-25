from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "HealthConnect AI"
    app_env: str = "development"
    frontend_origin: str = "http://localhost:3000"
    allowed_origins: str = ""
    cors_origins: str = "http://localhost:3000"
    database_url: str = "postgresql://postgres:postgres@localhost:5432/healthconnect_ai"
    ai_provider: str = "mock"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origin_list(self) -> list[str]:
        origins: list[str] = []
        for value in (self.frontend_origin, self.cors_origins, self.allowed_origins):
            origins.extend(origin.strip().rstrip("/") for origin in value.split(",") if origin.strip())

        return list(dict.fromkeys(origin for origin in origins if origin != "*"))


settings = Settings()
