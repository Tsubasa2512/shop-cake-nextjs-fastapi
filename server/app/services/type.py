from sqlalchemy.orm import Session
from app.models.type import Type

def get_all_types(db: Session):
    return db.query(Type).all()

def get_type_by_id(db: Session, type_id: int):
    return db.query(Type).filter(Type.id == type_id).first()
