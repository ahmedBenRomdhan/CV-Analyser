#!/bin/sh

# Start the Flask app
echo "Starting Flask app..."
python run.py &

# Start the RabbitMQ consumer
echo "Starting RabbitMQ consumer..."
python rabbitmq_consumer.py &

echo "Starting data extraction script"
python extract_data.py &

wait 
