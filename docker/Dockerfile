# Use latest node image
FROM node:12.18.1

# Get build enviroment (production or development). Default is `production`
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Go to client directory
WORKDIR /sunmait-career-day/client

# Install client dependencies
COPY client/package*.json ./
RUN apt-get update || : && apt-get install python -y
RUN npm install

# Copy client files
COPY client/. .

# Build client and move builded files to server
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi
RUN if [ "$NODE_ENV" = "production" ]; \
  then mkdir -p "/sunmait-career-day/server/API/public/${NODE_ENV}" && \
  cp -R ./build/* "/sunmait-career-day/server/API/public/${NODE_ENV}"; fi

# Go to server directory
WORKDIR /sunmait-career-day/server

# Install server dependencies
COPY server/package*.json ./
COPY server/API/package*.json ./API/
COPY server/Data/package*.json ./Data/
COPY server/Domain/package*.json ./Domain/
RUN npm run install-all

# Copy server files
COPY server/. .
COPY tslint.json /sunmait-career-day/

COPY docker/wait-for-db.sh .
RUN chmod +x ./wait-for-db.sh

# Run server
CMD if [ "$NODE_ENV" = "production" ]; then npm run start-prod; else npm run start; fi
