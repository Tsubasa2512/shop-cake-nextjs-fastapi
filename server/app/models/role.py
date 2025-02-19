from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base
from app.models.role_permission import role_permission

class Role(Base):
    __tablename__ = "role"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    users = relationship("User", back_populates="role")
    permissions = relationship("Permission", secondary=role_permission, back_populates="roles")
