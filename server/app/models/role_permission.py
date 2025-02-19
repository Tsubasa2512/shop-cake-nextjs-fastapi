from sqlalchemy import Table, Column, Integer, ForeignKey
from app.models.base.class_base import Base

role_permission = Table(
    "role_permission",
    Base.metadata,
    Column("id_role", Integer, ForeignKey("role.id"), primary_key=True),
    Column("id_permission", Integer, ForeignKey("permission.id"), primary_key=True),
)
