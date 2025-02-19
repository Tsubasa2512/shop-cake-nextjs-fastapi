from pydantic import BaseModel

class PermissionBase(BaseModel):
    name:str
    resource:str

class PermissionResponse(PermissionBase):
    id:int

    class Config:
        from_attributes = True
            