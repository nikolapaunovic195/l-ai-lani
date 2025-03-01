from flask import Flask

app = Flask(__name__)

@app.route('/prompt/')
def hello_world():
    return 'Hello, World!'