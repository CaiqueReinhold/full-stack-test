from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Query, Session

from .database import get_db
from .models import TaskCreate, TaskPagination, TaskRead, TaskUpdate
from .service import create, delete, get, get_by_user, update

router = APIRouter()


def paginate(query: Query, page: int, items_per_page: int):
    offset = 0 if page <= 0 else page - 1
    items = query.limit(items_per_page).offset(offset * items_per_page).all()
    total = query.order_by(None).count()
    return items, total


@router.get("/user/{user_id}/tasks", response_model=TaskPagination)
def get_tasks(
    *, db_session: Session = Depends(get_db), user_id: int, page: int = 1, items_per_page: int = 20
):
    items, total = paginate(
        query=get_by_user(db_session, user_id),
        page=page,
        items_per_page=items_per_page,
    )
    return {"items": items, "total": total}


@router.get("/task/{task_id}", response_model=TaskRead)
def get_task(*, db_session: Session = Depends(get_db), task_id: int):
    task = get(db_session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="A task with this id does not exist.")
    return task


@router.post("/task", response_model=TaskRead)
def create_task(*, db_session: Session = Depends(get_db), task_data: TaskCreate):
    user = create(db_session, task_data)
    return user


@router.put("/task/{task_id}", response_model=TaskRead)
def update_task(*, db_session: Session = Depends(get_db), task_id: int, task_data: TaskUpdate):
    task = get(db_session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="A task with this id does not exist.")
    task = update(db_session, task, task_data)
    return task


@router.delete("/task/{task_id}")
def delete_task(*, db_session: Session = Depends(get_db), task_id: int):
    task = get(db_session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="A task with this id does not exist.")
    delete(db_session, task_id)
