import pika
import time

def callback(ch, method, properties, body):
    print(f"Received {body}")

def main():
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            break
        except pika.exceptions.AMQPConnectionError as error:
            print(f"Connection failed, retrying in 5 seconds: {error}")
            time.sleep(5)
    
    channel = connection.channel()
    channel.queue_declare(queue='task_queue', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='task_queue', on_message_callback=callback, auto_ack=True)

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    main()
