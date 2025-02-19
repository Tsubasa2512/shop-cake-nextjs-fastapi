from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.type import get_all_types, get_type_by_id
from app.schema.type import TypeResponse

router = APIRouter(prefix="/types", tags=["Types"])

@router.get("/", response_model=list[TypeResponse])
def get_types(db: Session = Depends(get_db)):
    return get_all_types(db)

@router.get("/{type_id}", response_model=TypeResponse)
def get_type(type_id: int, db: Session = Depends(get_db)):
    type_obj = get_type_by_id(db, type_id)
    if not type_obj:
        raise HTTPException(status_code=404, detail="Type not found")
    return type_obj

