from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

# Naming convention for constraints
naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

# MetaData with naming convention
metadata = MetaData(naming_convention=naming_convention)
db = SQLAlchemy(metadata=metadata)

# MODELS
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)
    email = db.Column(db.VARCHAR, nullable=False, unique=True)
    password_hash = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.now())

    categories = db.relationship("Category", back_populates="user")
    links = db.relationship("Link", back_populates="user")

    serialize_rules = ("-password_hash", "-categories", "-links")


class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True
    )
    created_at = db.Column(db.TIMESTAMP, default=datetime.now())

    user = db.relationship("User", back_populates="categories", uselist=False)
    links = db.relationship("Link", back_populates="category")

    serialize_rules = ("-user_id", "-user", "-links")


class Link(db.Model, SerializerMixin):
    __tablename__ = "links"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, default=datetime.now())

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )
    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id", ondelete="SET NULL"),
        nullable=True
    )

    user = db.relationship("User", back_populates="links", uselist=False)
    category = db.relationship("Category", back_populates="links", uselist=False)

    serialize_rules = ("-user", "-category")

    
