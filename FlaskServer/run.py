from app import create_app
import logging
import sys

app = create_app()

if __name__ == "__main__":
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)
    app.run(debug=True, host='0.0.0.0')