from pydantic import BaseModel,EmailStr
from typing import Optional
from .role import RoleResponse

class UserBase(BaseModel):
    name:str
    email:EmailStr
    is_active:bool

class UseResponse(UserBase):
    id:int
    role:Optional[RoleResponse]   
    
    class Config:
        from_attributes = True

class UserCreate(UserBase):
    id_role:int
    password:str
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    id_role: Optional[int] = None


class UserLogin(BaseModel):
    email:EmailStr
    password:str