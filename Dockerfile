 # Create image based on the official Node 12 image from the dockerhub
FROM node:12.16.3-alpine3.9 as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json ./

# Install dependecies
RUN npm install

# Install PM2
RUN npm i -g pm2

# Get all the code needed to run the app
COPY . /usr/src/app

# Build
RUN npm run build

# Stage 2
FROM node:12.16.3-alpine3.9 as node2

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app/dist

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

COPY --from=node /usr/src/app/dist ./dist

COPY --from=node /usr/src/app/ecosystem.config.js ./

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["pm2-runtime", "start","ecosystem.config.js"]
