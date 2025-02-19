from sqlalchemy import Column, Integer, String, ForeignKey,Text
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class Config(Base):
    __tablename__ = "config"

    id = Column(Integer, primary_key=True, autoincrement=True)
    variabel = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
