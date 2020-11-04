from typing import Optional

from sqlalchemy.orm import Query, Session

from .models import User, UserCreate


def get(db_session: Session, user_id: int) -> Optional[User]:
    return db_session.query(User).filter(User.id == user_id).first()


def get_by_name(db_session: Session, name: str) -> Optional[User]:
    return db_session.query(User).filter(User.name == name).first()


def get_all(db_session: Session) -> Query:
    return db_session.query(User)


def create(db_session: Session, user_data: UserCreate) -> User:
    user = User(**user_data.dict())
    db_session.add(user)
    db_session.commit()
    return user


def update(db_session: Session, user: User, user_data: UserCreate) -> User:
    user.name = user_data.name
    db_session.commit()
    return user


def delete(db_session: Session, user_id: int):
    db_session.query(User).filter(User.id == user_id).delete()
    db_session.commit()
