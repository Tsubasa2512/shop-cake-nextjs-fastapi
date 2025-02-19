from pydantic import BaseModel
from .permission import PermissionResponse
from .role import RoleResponse

class RolePermissionBase(BaseModel):
    id_role:int
    id_permission:int

    class Config:
        orm_mode = True