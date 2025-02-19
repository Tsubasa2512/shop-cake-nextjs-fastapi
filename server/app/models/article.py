from sqlalchemy import Column, Integer, String, ForeignKey,Text, TIMESTAMP, text

from sqlalchemy.orm import relationship
from app.models.base.class_base import Base
class Article(Base):
    __tablename__ = "article"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    tag = Column(Text)
    keywords = Column(Text)
    slug = Column(String(255), unique=True, nullable=False)
    intro = Column(Text)
    description = Column(Text)
    updated_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    id_category = Column(Integer, ForeignKey("category.id"), nullable=False)
    id_user = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    user = relationship("User", back_populates="articles")
    category = relationship("Category", back_populates="articles")