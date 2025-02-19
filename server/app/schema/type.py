from pydantic import BaseModel

class TypeBase(BaseModel):
    name: str

class TypeResponse(TypeBase):
    id: int

    class Config:
        from_attributes = True
