# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the frontend files
COPY . .

# Expose port 5173 (Vite default)
EXPOSE 5173

# Start Vite server
CMD ["npm", "run", "dev"]