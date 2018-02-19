FROM node:7.10-alpine
WORKDIR /etc/sendgrpc

COPY /examples ./

RUN npm install -g sendgrpc@0.1.5

USER node
CMD sendgrpc
EXPOSE 8888