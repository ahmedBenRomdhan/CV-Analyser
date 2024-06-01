# Use an official Python runtime as a base image
FROM python:3.11-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Flask and any other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Copy the start script to the container
COPY start.sh /app/start.sh

# Ensure the start script has execution permissions
RUN chmod +x /app/start.sh

# Run the start script when the container launches
# CMD ["/bin/sh", "/app/start.sh"]
CMD ["/bin/sh", "/app/start.sh"]



