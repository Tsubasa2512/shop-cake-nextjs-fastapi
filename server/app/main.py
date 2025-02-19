from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.api.v1.endpoints.type import router as type_router
from app.api.v1.endpoints.menu import router as menu_router
from app.api.v1.endpoints.category import router as category_router
from app.api.v1.endpoints.article import router as article_router
from app.api.v1.endpoints.gallery import router as gallery_router
from app.api.v1.endpoints.product import router as product_router
from app.api.v1.endpoints.social import router as social_router
from app.api.v1.endpoints.config import router as config_router
from app.api.v1.endpoints.role import router as role_router
from app.api.v1.endpoints.permission import router as permission_router
from app.api.v1.endpoints.role_permission import router as role_permission_router
from app.api.v1.endpoints.user import router as user_router
app = FastAPI()
load_dotenv()

allowed_hosts = os.getenv("FASTAPI_ALLOWED_HOSTS", "").split(",")
allowed_hosts = [host.strip() for host in allowed_hosts if host.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_hosts,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
app.include_router(type_router)
app.include_router(menu_router)
app.include_router(category_router)
app.include_router(article_router)
app.include_router(gallery_router)
app.include_router(product_router)
app.include_router(social_router)
app.include_router(config_router)
app.include_router(role_router)
app.include_router(permission_router)
app.include_router(role_permission_router)
app.include_router(user_router)
