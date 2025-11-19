# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json .

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
# CMD ["node", "/app/server.js"]