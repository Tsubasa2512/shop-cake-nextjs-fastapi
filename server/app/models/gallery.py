from sqlalchemy import Column, Integer, String, ForeignKey,Text, Boolean
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    intro = Column(Text)
    is_active = Column(Boolean, default=True)
    slug = Column(String(255), unique=True, nullable=False)
    id_category = Column(Integer, ForeignKey("category.id"), nullable = False)
    id_user = Column(Integer, ForeignKey("user.id"), nullable=False)
   
    user = relationship("User", back_populates="gallery")
    category = relationship("Category", back_populates="gallerys")