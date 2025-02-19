from sqlalchemy.orm import Session, joinedload
from app.models.user import User
from app.schema.user import UserCreate, UserUpdate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_all_users(db:Session):
    users = db.query(User).options(joinedload(User.role)).all()
    return users

def get_user_by_id(db:Session , user_id :int):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db:Session, user_create:UserCreate):
    hashed_password = hash_password(user_create.password) 
    user = User(
        name = user_create.name,
        email = user_create.email,
        password = hashed_password,
        is_active= user_create.is_active,
        id_role = user_create.id_role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    user_data = user_update.model_dump()
    
    if "password" in user_data:
        if user_data["password"]:
            user_data["password"] = hash_password(user_data["password"])
        else:
            del user_data["password"]

    db.query(User).filter(User.id == user_id).update(user_data, synchronize_session=False)
    db.commit()
    return db.query(User).filter(User.id == user_id).first()



def delete_user(db:Session, user_id):
    db.query(User).filter(User.id == user_id).delete()
    db.commit()
    return user_id

