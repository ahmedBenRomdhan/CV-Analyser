# process_files.py
import os
import json
import logging
import sys
from rabbitmq_consumer import message_list

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, force=True)
# Import the message_list from rabbitmq_consumer
logging.info(f"data {message_list}")
# Directory containing the files
UPLOADS_DIR = 'uploads/Cvs'

def process_file(file_path):
    # Implement the logic to process the file
    logging.info(f"Processing file: {file_path}")
    # For example, read and print the file content
    with open(file_path, 'r') as file:
        data = file.read()
        logging.info(f"File content: {data}")

def main():
    
    for message in message_list:
        # Extract the file path from the message
        file_path = os.path.join(UPLOADS_DIR, message['filePath'])
        if os.path.exists(file_path):
            process_file(file_path)
        else:
            logging.info(f"File not found: {file_path}")

if __name__ == '__main__':
    sys.stdout = open(sys.stdout.fileno(), 'w', buffering=1)
    sys.stderr = open(sys.stderr.fileno(), 'w', buffering=1)
    main()
