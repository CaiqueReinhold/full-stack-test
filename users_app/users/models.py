from typing import List

from pydantic import BaseModel
from sqlalchemy import Column, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)


class UserRead(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    name: str


class UserPagination(BaseModel):
    total: int
    items: List[UserRead]
