#!/usr/bin/env python3
import json
from flask import Flask
from flask.json import jsonify
from vosk import KaldiRecognizer, Model, SetLogLevel

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'hello': 'world!!!'})

def main():
    app.run(debug=True)

if __name__ == "__main__":
     app.run(debug=True)