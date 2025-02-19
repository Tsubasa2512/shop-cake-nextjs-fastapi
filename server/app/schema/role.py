from pydantic import BaseModel
from typing import List
from .permission import PermissionResponse

class RoleBase(BaseModel):
    name:str

class RoleResponse(RoleBase):
    id: int
    permissions:List[PermissionResponse]

    class Config:
        from_attributes = True

        
class CreateRole(RoleBase):
    permission_ids:List[int]

    class Config:
        from_attributes :True