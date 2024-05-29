#!/bin/sh

# Start the Flask app in the background
python run.py &

# Start the RabbitMQ consumer (you will create this file in a later step)
python rabbitmq_consumer.py