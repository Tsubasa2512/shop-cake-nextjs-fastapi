from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.user import (
    get_all_users, get_user_by_id, create_user, update_user, delete_user, verify_password
)
from app.schema.user import UserCreate, UserUpdate, UserLogin
from app.models.user import User

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    return get_all_users(db)

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/")
def create_new_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, user_data)
    return user

@router.put("/{user_id}")
def update_existing_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):
    user = update_user(db, user_id, user_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    delete_user(db, user_id)
    return {"message": "User deleted successfully"}

@router.post("/login")
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "user_id": user.id, "email": user.email}
