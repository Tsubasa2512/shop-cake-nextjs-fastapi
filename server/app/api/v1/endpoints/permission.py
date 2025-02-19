from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.database_postgresql import get_db
from app.services.permission import  get_all_permissions, get_permission_by_id
from app.schema.permission import PermissionResponse

router = APIRouter(prefix="/permission", tags=["Permissions"])

@router.get("/", response_model=List[PermissionResponse])
def read_permissions(db: Session = Depends(get_db)):
    return get_all_permissions(db)

@router.get("/{permission_id}", response_model=PermissionResponse)
def read_permission(permission_id: int, db: Session = Depends(get_db)):
    permission = get_permission_by_id(db, permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permission not found")
    return permission
