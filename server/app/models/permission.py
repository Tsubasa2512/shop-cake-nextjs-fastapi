from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base
from app.models.role_permission import role_permission
class Permission(Base):
    __tablename__ = "permission"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    resource = Column(String(255),nullable=False)

    roles = relationship("Role", secondary=role_permission, back_populates="permissions")
