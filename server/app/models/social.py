from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base.class_base import Base

class Social(Base):
    __tablename__ = "social"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    variabel = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False)

    id_user = Column(Integer, ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="social_accounts")
