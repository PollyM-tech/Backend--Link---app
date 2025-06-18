from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return {"message": "Welcome to my Link-app!"}

if __name__ == "__main__":
    app.run(debug=True)
