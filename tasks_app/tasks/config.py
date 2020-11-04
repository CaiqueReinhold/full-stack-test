from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

DEBUG = config("DEBUG", cast=bool, default=True)

DATABASE_HOSTNAME = config("DATABASE_HOSTNAME", default="localhost")
DATABASE_CREDENTIALS = config("DATABASE_CREDENTIALS", cast=Secret, default="dev:dev123")
DATABASE_NAME = config("DATABASE_NAME", default="tasks")
DATABASE_PORT = config("DATABASE_PORT", default="5432")
SQLALCHEMY_DB_URI = f"postgresql+psycopg2://{DATABASE_CREDENTIALS}@{DATABASE_HOSTNAME}:{DATABASE_PORT}/{DATABASE_NAME}"
