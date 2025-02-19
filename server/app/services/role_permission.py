from sqlalchemy.orm import Session
from app.models.role_permission import role_permission

def get_all_role_permissions(db:Session):
    return db.query(role_permission).all()
