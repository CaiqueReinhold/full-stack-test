from typing import Optional

from sqlalchemy.orm import Query, Session

from .models import Task, TaskCreate, TaskUpdate


def get(db_session: Session, task_id: int) -> Optional[Task]:
    return db_session.query(Task).filter(Task.id == task_id).first()


def get_by_user(db_session: Session, user_id: int) -> Query:
    return db_session.query(Task).filter(Task.user_id == user_id)


def create(db_session: Session, task_data: TaskCreate) -> Task:
    task = Task(**task_data.dict())
    db_session.add(task)
    db_session.commit()
    return task


def update(db_session: Session, task: Task, task_data: TaskUpdate) -> Task:
    if task_data.description:
        task.description = task_data.description
    task.state = task_data.state
    db_session.commit()
    return task


def delete(db_session: Session, task_id: int):
    db_session.query(Task).filter(Task.id == task_id).delete()
    db_session.commit()
