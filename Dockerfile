# Use an official Node.js runtime as a parent image
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . . /app/

# Install the dependencies
RUN npm install

# Build the app for production
RUN npm run build

# Expose port 5173 to the outside world
#EXPOSE 5173

# Start the app
CMD ["npm", "start"]

# Sử dụng image Nginx làm base
# FROM nginx

# Copy file index.html vào thư mục /usr/share/nginx/html
# COPY index.html /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]