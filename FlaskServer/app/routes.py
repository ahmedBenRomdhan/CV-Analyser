from flask import render_template, request, jsonify
from app import app

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    # Process data here
    return jsonify({"status": "success", "data": data})