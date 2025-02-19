from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.database_postgresql import get_db
from app.services.role import get_all_roles, get_role_by_id, create_role, update_role, delete_role
from app.schema.role import RoleResponse, CreateRole

router = APIRouter(prefix="/role", tags=["Role"])

@router.get("/", response_model=List[RoleResponse])
def read_roles(db: Session = Depends(get_db)):
    return get_all_roles(db)

@router.get("/{role_id}", response_model=RoleResponse)
def read_role(role_id: int, db: Session = Depends(get_db)):
    role = get_role_by_id(db, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

@router.post("/", response_model=RoleResponse)
def create_new_role(role: CreateRole, db: Session = Depends(get_db)):
    return create_role(db, role)

@router.put("/{role_id}", response_model=RoleResponse)
def update_existing_role(role_id: int, role: CreateRole, db: Session = Depends(get_db)):
    updated_role = update_role(db, role_id, role)
    if not updated_role:
        raise HTTPException(status_code=404, detail="Role not found")
    return updated_role

@router.delete("/{role_id}")
def delete_existing_role(role_id: int, db: Session = Depends(get_db)):
    deleted_id = delete_role(db, role_id)
    if deleted_id is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return {"message": "Role deleted successfully", "role_id": deleted_id}
