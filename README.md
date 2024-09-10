# Frontend Take-Home Challenge

Welcome to the take-home challenge for the Frontend web developer position. We are excited to see your skills and experience in action. The challenge is to create the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

# Requirements:

1. Article search and filtering: Users should be able to search for articles by keyword and filter the results by date, category, and source.

   # Module/General News file

   handle filters with search bar and listing with pagincation

2. Personalized news feed: Users should be able to customize their news feed by selecting their preferred sources, categories, and authors.

   # Module/Personalized News

   handle personalized filter with listing and pagination , personalized data saved in localsotrage for next time auto load data base on preference

3. Mobile-responsive design: The website should be optimized for viewing on mobile devices.
   # Mobile Responsive
   whole app and boht module are mobile resposive with tailwind css

# Docker File Configuration

FROM node:18 AS build
WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies

RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Application working

# 1. Build the Docker image

Open a terminal, navigate to the directory where your Dockerfile is located, and run the following command to build the Docker image:

```
docker build -t news-app .
or
sudo docker build -t news-app .
```

# 2. Run the Docker container

Once the Docker image is built, you can run a container based on that image using the following command:

```
sudo docker run -p 3000:80 news-app
```

# 3. Other-way for application working

npm install & npm start

# 4. Access your React application

You can now access your React application by opening a web browser and navigating to `http://localhost:3000`.
