from pydantic import BaseModel
from typing import Optional
from .category import CategoryResponse

class GalleryBase(BaseModel):
    name: str
    slug: str
    is_active: bool
    intro: Optional[str]
    id_user: int

class GalleryResponse(GalleryBase):
    id: int
    category: Optional[CategoryResponse]
    class Config:
        from_attributes = True    

class GalleryCreate(GalleryBase):
    id_category: int
    pass

class GalleryUpdate(GalleryBase):
    id_category: int
    pass