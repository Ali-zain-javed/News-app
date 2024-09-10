# Stage 1: Build React app
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the React build files from Stage 1 to the Nginx folder
COPY --from=build /app/build /usr/share/nginx/html


# Expose port 80 to serve the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

