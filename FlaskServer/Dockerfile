# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file first, to leverage Docker layer caching
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download the spaCy model
RUN python -m spacy download en_core_web_sm

# Download NLTK data
RUN python -m nltk.downloader punkt stopwords

# Copy the rest of the application code
COPY . /app

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Ensure the start script has execution permissions
RUN chmod +x /app/start.sh

# Run the start script when the container launches
CMD ["/bin/sh", "/app/start.sh"]
