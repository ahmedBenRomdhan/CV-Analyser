# import pika
# import time

# def callback(ch, method, properties, body):
#     print(f"Received {body}")

# def main():
#     while True:
#         try:
#             connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
#             break
#         except pika.exceptions.AMQPConnectionError as error:
#             print(f"Connection failed, retrying in 5 seconds: {error}")
#             time.sleep(5)
    
#     channel = connection.channel()
#     channel.queue_declare(queue='cv_processing_queue', durable=True)
#     channel.basic_qos(prefetch_count=1)
#     channel.basic_consume(queue='cv_processing_queue', on_message_callback=callback, auto_ack=True)

#     print('Waiting for messages. To exit press CTRL+C')
#     channel.start_consuming()

# if __name__ == '__main__':
#     main()

import pika
import time
import logging
import sys
import json

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, force=True)
message_list = []
def callback(ch, method, properties, body):
    message = json.loads(body)
    # Append the message to the global list
    message_list.append(message)
    logging.info(f"consumer {message_list}")
    logging.info(f"Received {body}")

def main():
    logging.debug("Starting main function")
    while True:
        try:
            logging.debug("Attempting to connect to RabbitMQ")
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            logging.debug("Connected to RabbitMQ")
            break
        except pika.exceptions.AMQPConnectionError as error:
            logging.error(f"Connection failed, retrying in 5 seconds: {error}")
            time.sleep(5)
    
    channel = connection.channel()
    logging.debug("Channel created")
    channel.queue_declare(queue='cv_processing_queue', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='cv_processing_queue', on_message_callback=callback, auto_ack=True)

    logging.info('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    # Disable output buffering
    sys.stdout = open(sys.stdout.fileno(), 'w', buffering=1)
    sys.stderr = open(sys.stderr.fileno(), 'w', buffering=1)
    main()
