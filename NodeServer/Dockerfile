# Use an official Node runtime as a parent image
FROM node:18.20


# Set the working directory in the container
WORKDIR /usr/src/app

RUN mkdir -p /usr/src/uploads/Cvs
RUN mkdir -p /usr/src/uploads/JobDescriptions
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD [ "npm", "start" ]
