from pydantic import BaseModel
from typing import Optional
from .menu import MenuResponse

class CategoryBase(BaseModel):
    name: str
    slug: str
    is_active: bool
    description: Optional[str]
    id_user: int

class CategoryResponse(CategoryBase):
    id: int
    menu: Optional[MenuResponse]

    class Config:
        from_attributes = True

class CategoryCreate(CategoryBase):
    id_menu: int
    pass

class CategoryUpdate(CategoryBase):
    id_menu: int
    pass