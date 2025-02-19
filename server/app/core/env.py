import os
from typing import Any, Optional

from dotenv import load_dotenv
from pydantic import PostgresDsn, field_validator
from pydantic_core.core_schema import FieldValidationInfo
from pydantic_settings import BaseSettings

load_dotenv()

class Env(BaseSettings):

    ENV: str = os.environ.get("ENV")
    API_V1_STR: str = os.environ.get("API_V1_STR")
    
    
    REDIS_URL: str = os.environ.get("REDIS_URL")

    POSTGRES_SERVER: str = os.environ.get(
        "POSTGRES_SERVER"
    )
    POSTGRES_PORT: int = os.environ.get("POSTGRES_PORT")
    POSTGRES_USER: str = os.environ.get("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.environ.get(
        "POSTGRES_PASSWORD"
    )
    POSTGRES_DB: str = os.environ.get("POSTGRES_DB")

    SQLALCHEMY_ORGS_URI: Optional[PostgresDsn] = None

    JWT_SECRET_KEY: str = os.environ.get("JWT_SECRET_KEY")
    JWT_ALGORITHM: str = os.environ.get("JWT_ALGORITHM")
    JWT_ACCESS_TOKEN_EXP_DAYS: int = os.environ.get("JWT_ACCESS_TOKEN_EXP_DAYS")
    JWT_REFRESH_TOKEN_EXP_DAYS: int = os.environ.get(
        "JWT_REFRESH_TOKEN_EXP_DAYS"
    )

    MY_VERIFY_TOKEN: str = os.environ.get("MY_VERIFY_TOKEN")

    GOOGLE_CLIENT_ID: str = os.environ.get("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET: str = os.environ.get("GOOGLE_CLIENT_SECRET")

    BASE_BACKEND_URL: str = os.environ.get("BASE_BACKEND_URL")
    BASE_FRONTEND_URL: str = os.environ.get("BASE_FRONTEND_URL")
    BASE_FRONTEND_ADMIN_ALLY_URL: str = os.environ.get(
        "BASE_FRONTEND_ADMIN_ALLY_URL"
    )
    BASE_PRODUCTION_FRONTEND_URL: str = os.environ.get(
        "BASE_PRODUCTION_FRONTEND_URL"
    )
    BASE_PRODUCTION_FRONTEND_ADMIN_ALLY_URL: str = os.environ.get(
        "BASE_PRODUCTION_FRONTEND_ADMIN_ALLY_URL"
    )
    BASE_AI_URL: str = os.environ.get("BASE_AI_URL")

    BASE_FRONTEND_LOCAL_URL: str = os.environ.get("BASE_FRONTEND_LOCAL_URL")
    BASE_FRONTEND_ADMIN_ALLY_LOCAL_URL: str = os.environ.get(
        "BASE_FRONTEND_ADMIN_ALLY_LOCAL_URL"
    )

    MAIL_USERNAME: str = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.environ.get("MAIL_PASSWORD")
    MAIL_FROM: str = os.environ.get("MAIL_FROM")
    MAIL_PORT: int = os.environ.get("MAIL_PORT")
    MAIL_SERVER: str = os.environ.get("MAIL_SERVER")
    MAIL_STARTTLS: bool = os.environ.get("MAIL_STARTTLS")
    MAIL_SSL_TLS: bool = os.environ.get("MAIL_SSL_TLS")
    USE_CREDENTIALS: bool = os.environ.get("USE_CREDENTIALS")

    MAIL_ACCEPT_INVITATION_SUBJECT: str = os.environ.get(
        "MAIL_ACCEPT_INVITATION_SUBJECT"
    )

    AWS_ACCESS_KEY_ID: str = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: str = os.environ.get("AWS_SECRET_ACCESS_KEY")
    AWS_BUCKET: str = os.environ.get("AWS_BUCKET")

    API_KEY: str = os.environ.get("API_KEY")

    CHECK_IP_URL: str = os.environ.get("CHECK_IP_URL")
    CLIENT_IP: str = os.environ.get("CLIENT_IP")

    FACEBOOK_URL: str = os.environ.get("FACEBOOK_URL")

    NOBI_ACCESS_TOKEN: str = os.environ.get("NOBI_ACCESS_TOKEN")
    NOBI_CURRENT_CUSTOMER_ID: str = os.environ.get("NOBI_CURRENT_CUSTOMER_ID")
    NOBI_URL: str = os.environ.get("NOBI_URL")
    NOBI_APP_URL: str = os.environ.get("NOBI_APP_URL")
    NOBI_OTHER_REASON_ID: str = os.environ.get("NOBI_OTHER_REASON_ID")
    NOBI_CHANGE_IN_PRODUCT_QUANTITY_ID: str = os.environ.get(
        "NOBI_CHANGE_IN_PRODUCT_QUANTITY_ID"
    )

    @field_validator("SQLALCHEMY_ORGS_URI", mode="before")
    @classmethod
    def assemble_db_connection(
        cls, v: Optional[str], info: FieldValidationInfo
    ) -> Any:
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme="postgresql",
            username=info.data.get("POSTGRES_USER"),
            password=info.data.get("POSTGRES_PASSWORD"),
            host=info.data.get("POSTGRES_SERVER"),
            port=info.data.get("POSTGRES_PORT"),
            path=info.data.get("POSTGRES_DB"),
        )

    class Config:
        case_sensitive = True


env = Env()


