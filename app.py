from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///linksaver.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "super-secret-key")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["BUNDLE_ERRORS"] = True
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class Index(Resource):
    def get(self):
        return {"message": "Welcome to the LinkSaver API"}


api.add_resource(Index, "/")
# api.add_resource(SignUpResource, "/signup")
# api.add_resource(LoginResource, "/login")
# api.add_resource(LinkListResource, "/links")
# api.add_resource(LinkResource, "/links/<int:id>")
# api.add_resource(CategoryListResource, "/categories")

if __name__ == "__main__":
    app.run(debug=True, port=5555)
