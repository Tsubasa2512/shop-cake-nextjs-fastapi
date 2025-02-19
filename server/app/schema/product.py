from pydantic import BaseModel
from typing import Optional
from .category import CategoryResponse

class ProductBase(BaseModel):
    name: str
    slug: str
    is_active: bool
    intro: Optional[str]
    price:Optional[float]
    description: Optional[str]
    keywords: Optional[str]
    id_user: int

class ProductResponse(ProductBase):
    id: int
    category: Optional[CategoryResponse]
    class Config:
        from_attributes = True

class ProductCreate(ProductBase):
    id_category: int
    pass

class ProductUpdate(ProductBase):
    id_category: int
    pass