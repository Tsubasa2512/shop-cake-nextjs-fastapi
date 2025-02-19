from pydantic import BaseModel
from typing import Optional
from .category import CategoryResponse

class ArticleBase(BaseModel):
    name: str
    slug: str
    is_active: bool
    intro: Optional[str]
    description: Optional[str]
    tag: Optional[str]
    keywords: Optional[str]
    id_user: int


class ArticleResponse(ArticleBase):
    id: int
    category: Optional[CategoryResponse]
    class Config:
        from_attributes = True

class ArticleCreate(ArticleBase):
    id_category: int
    pass

class ArticleUpdate(ArticleBase):
    id_category: int
    pass
