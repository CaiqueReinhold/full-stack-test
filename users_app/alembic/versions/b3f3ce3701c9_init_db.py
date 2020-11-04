"""init db

Revision ID: b3f3ce3701c9
Revises:
Create Date: 2020-10-30 02:57:37.092181

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "b3f3ce3701c9"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "user",
        sa.Column("id", sa.Integer()),
        sa.Column("name", sa.String(250), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("user")
