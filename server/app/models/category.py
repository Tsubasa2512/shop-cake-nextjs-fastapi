from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP, text
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    image = Column(String(255))
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    updated_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    id_menu = Column(Integer, ForeignKey("menu.id"), nullable=False)
    id_user = Column(Integer, ForeignKey("user.id"), nullable=False)

    menu = relationship("Menu", back_populates="categories")
    user = relationship("User", back_populates="categories")
    articles = relationship("Article", back_populates="category")
    products = relationship("Product", back_populates="category")
    gallerys = relationship("Gallery", back_populates="category")