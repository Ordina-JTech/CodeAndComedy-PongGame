# Step 1: Build the app in image 'builder'
FROM node:12-alpine AS builder
## Install some extra packages to make sure we can build and "npm install" our dependencies later

WORKDIR /usr/src/app
COPY src ./src/
COPY *.json ./
RUN ls -lsa && npm install && ls -lsa && npm run prod && ls -lsa

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine

LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/code-and-comedy-pong-server/ .

## expose port 80
EXPOSE 80

## run nginx
CMD ["nginx", "-g", "daemon off;"]
