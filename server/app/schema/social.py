from pydantic import BaseModel
from typing import Optional

class SocialBase(BaseModel):
    id:int
    name:str
    slug:str
    is_active:bool
    id_user: int

class SocialUpdate(BaseModel):
    id:int
    slug:str
    is_active:bool
    id_user: int