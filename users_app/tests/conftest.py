import os

import pytest
from sqlalchemy_utils import create_database, database_exists, drop_database

os.environ["DATABASE_HOSTNAME"] = "localhost"
os.environ["DATABASE_CREDENTIALS"] = "dev:dev123"
os.environ["DATABASE_NAME"] = "users_test"
os.environ["DATABASE_PORT"] = "5432"


@pytest.fixture(scope="session", autouse=True)
def db():
    from users import config
    from users.database import Base, SessionLocal, engine

    print(config.SQLALCHEMY_DB_URI)

    if database_exists(str(config.SQLALCHEMY_DB_URI)):
        drop_database(str(config.SQLALCHEMY_DB_URI))

    create_database(str(config.SQLALCHEMY_DB_URI))
    Base.metadata.create_all(engine)
    _db = SessionLocal()
    yield _db
    drop_database(str(config.SQLALCHEMY_DB_URI))


@pytest.fixture(scope="function")
def session(db):
    db.begin_nested()
    yield db
    db.rollback()
