FROM node:17-alpine
MAINTAINER swarupjois@gmail.com

WORKDIR /app/voterapp

COPY app-client ./app-client
COPY app-server ./app-server
COPY build.sh .

RUN chmod 755 build.sh
RUN ./build.sh

WORKDIR /app/voterapp/app-server

ENTRYPOINT npm start