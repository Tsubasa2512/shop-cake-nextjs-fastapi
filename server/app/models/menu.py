from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, text
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class Menu(Base):
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    index_menu = Column(Integer, nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    updated_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    id_user = Column(Integer, ForeignKey("user.id"), nullable=False)
    id_type = Column(Integer, ForeignKey("type.id"), nullable=False)

    user = relationship("User", back_populates="menus")
    type = relationship("Type", back_populates="menus")
    categories = relationship("Category", back_populates="menu")
