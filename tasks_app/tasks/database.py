import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from starlette.requests import Request

from .config import SQLALCHEMY_DB_URI

engine = sqlalchemy.create_engine(SQLALCHEMY_DB_URI)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


def get_db(request: Request):
    return request.state.db
