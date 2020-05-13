 # Create image based on the official Node 12 image from the dockerhub
FROM node:12.16.3-alpine3.9 as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Install PM2
RUN npm i -g pm2

# Get all the code needed to run the app
COPY . /usr/src/app


# Install dependecies
RUN npm install


# Build
RUN npm run build


# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["pm2-runtime", "start","ecosystem.config.js"]
