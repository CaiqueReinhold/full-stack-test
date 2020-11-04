from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Query, Session

from .database import get_db
from .models import UserCreate, UserPagination, UserRead
from .service import create, delete, get, get_all, get_by_name, update

router = APIRouter()


def paginate(query: Query, page: int, items_per_page: int):
    offset = 0 if page <= 0 else page - 1
    items = query.limit(items_per_page).offset(offset * items_per_page).all()
    total = query.order_by(None).count()
    return items, total


@router.get("/users", response_model=UserPagination)
def get_users(*, db_session: Session = Depends(get_db), page: int = 1, items_per_page: int = 20):
    items, total = paginate(query=get_all(db_session), page=page, items_per_page=items_per_page)
    return {"items": items, "total": total}


@router.get("/user/{user_id}", response_model=UserRead)
def get_user(*, db_session: Session = Depends(get_db), user_id: int):
    user = get(db_session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="A user with this id does not exist.")
    return user


@router.post("/user", response_model=UserRead)
def create_user(*, db_session: Session = Depends(get_db), user_data: UserCreate):
    user = get_by_name(db_session, user_data.name)
    if user:
        raise HTTPException(
            status_code=400, detail=f"User with name {user_data.name} already exists."
        )
    user = create(db_session, user_data)
    return user


@router.put("/user/{user_id}", response_model=UserRead)
def update_user(*, db_session: Session = Depends(get_db), user_id: int, user_data: UserCreate):
    user = get(db_session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="A user with this id does not exist.")
    user = update(db_session, user, user_data)
    return user


@router.delete("/user/{user_id}")
def delete_user(*, db_session: Session = Depends(get_db), user_id: int):
    user = get(db_session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="A user with this id does not exist.")
    delete(db_session, user_id)
