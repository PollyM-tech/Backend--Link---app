import os
from flask import Flask
from datetime import timedelta
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv


from models import db
#import resources


load_dotenv()

app = Flask(__name__)

CORS(app)

api = Api(app)

#configurations
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI", "sqlite:///linksaver.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#database and migrations
db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def index():
    return {"message": "Welcome to the simplified LinkSaver App"}



if __name__ == "__main__":
    app.run(debug=True)
