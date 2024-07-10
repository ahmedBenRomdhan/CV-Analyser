from app import create_app
import logging
import sys
from flask_cors import CORS

app = create_app()
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

if __name__ == "__main__":
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)
    app.run(debug=True, host='0.0.0.0')