from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class Type(Base):
    __tablename__ = "type"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)

    menus = relationship("Menu", back_populates="type")  # Liên kết với bảng Menu
