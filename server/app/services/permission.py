from sqlalchemy.orm import Session
from app.models.permission import Permission

def get_all_permissions(db:Session):
    return db.query(Permission).all()

def get_permission_by_id(db:Session, permission_id: int):
    return db.query(Permission).filter(Permission.id == permission_id).first()

