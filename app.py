from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Basic configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI", "sqlite:///linksaver.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize database and migrations
db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def index():
    return {"message": "Welcome to the simplified LinkSaver App"}

if __name__ == "__main__":
    app.run(debug=True)
