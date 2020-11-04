from typing import List, Optional

from pydantic import BaseModel
from sqlalchemy import Boolean, Column, Integer, String

from .database import Base


class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True)
    description = Column(String(250), nullable=False)
    state = Column(Boolean, default=False)
    user_id = Column(Integer, nullable=False)


class TaskRead(BaseModel):
    id: int
    description: str
    state: bool
    user_id: int

    class Config:
        orm_mode = True


class TaskPagination(BaseModel):
    total: int
    items: List[TaskRead]


class TaskCreate(BaseModel):
    description: str
    user_id: int


class TaskUpdate(BaseModel):
    description: Optional[str] = None
    state: bool
