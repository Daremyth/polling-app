FROM node:latest

MAINTAINER Harith Zahid

ENV NODE_ENV=production
ENV PORT=3000

# copying the source code from host file into container
COPY . /var/www 
WORKDIR /var/www

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "npm", "start" ]