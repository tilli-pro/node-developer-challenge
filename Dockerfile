# Use the official Node.js image as the base image
FROM node:14-alpine

# Create a new directory to hold our application code
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Set the entrypoint to run the CLI
ENTRYPOINT ["node", "dist/index.js"]