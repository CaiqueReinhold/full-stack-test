"""init db

Revision ID: 5ff6c40d027c
Revises:
Create Date: 2020-10-30 03:35:47.603720

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "5ff6c40d027c"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "task",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("description", sa.String(length=250), nullable=False),
        sa.Column("state", sa.Boolean(), nullable=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("task")
