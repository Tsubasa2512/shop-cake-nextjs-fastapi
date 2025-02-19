from sqlalchemy.orm import Session
from app.models.role import Role
from app.models.permission import Permission
from app.schema.role import RoleResponse, CreateRole
from app.models.role_permission import role_permission

def get_all_roles(db: Session):
    return db.query(Role).order_by(Role.id).all()

def get_role_by_id(db: Session, role_id: int):
    return db.query(Role).filter(Role.id == role_id).first()

def create_role(db: Session, role_create: CreateRole):
    new_role = Role(name=role_create.name)
    
    if role_create.permission_ids:
        permissions = db.query(Permission).filter(Permission.id.in_(role_create.permission_ids)).all()
        new_role.permissions = permissions

    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

def update_role(db: Session, role_id: int, role_update: CreateRole):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        return None  

    role.name = role_update.name
    if role_update.permission_ids:
        permissions = db.query(Permission).filter(Permission.id.in_(role_update.permission_ids)).all()
        role.permissions = permissions

    db.commit()
    db.refresh(role)
    return role

def delete_role(db: Session, role_id: int):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        return None  

    db.delete(role)
    db.commit()
    return role_id
