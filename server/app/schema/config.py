from pydantic import BaseModel
from typing import Optional

class  ConfigBase(BaseModel):
    id:int
    name:str
    description:str
    is_active:bool

class ConfigUpdate(BaseModel):
    id:int
    description:str
    is_active:bool