from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    id_role = Column(Integer, ForeignKey("role.id"), nullable=False)

    role = relationship("Role", back_populates="users")
    categories = relationship("Category", back_populates="user")
    products = relationship("Product", back_populates="user")
    articles = relationship("Article", back_populates="user")
    gallery = relationship("Gallery", back_populates="user")
    social_accounts = relationship("Social", back_populates="user")
    menus = relationship("Menu", back_populates="user")
