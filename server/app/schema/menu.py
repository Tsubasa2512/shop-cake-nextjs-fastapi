from pydantic import BaseModel
from typing import  Optional
from .type import TypeResponse

class MenuBase(BaseModel):
    name: str
    slug: str
    is_active: bool
    index_menu: int
    id_user:int
    
class MenuResponse(MenuBase):
    id: int
    type: Optional[TypeResponse]

    class Config:
        from_attributes = True   

class MenuCreate(MenuBase):
    id_type: int
    pass

class MenuUpdate(MenuBase):
    id_type: int 
    pass