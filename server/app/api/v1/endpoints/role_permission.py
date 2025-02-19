from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.database_postgresql import get_db
from app.services.role_permission import get_all_role_permissions
from app.schema.role_permission import RolePermissionBase

router = APIRouter(prefix="/role-permissions", tags=["Role-Permissions"])

@router.get("/", response_model=List[RolePermissionBase])
def read_role_permissions(db: Session = Depends(get_db)):
    return get_all_role_permissions(db)
