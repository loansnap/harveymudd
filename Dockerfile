FROM node:12.11.1-alpine
RUN mkdir /src
WORKDIR /src
ADD . /src/
CMD ["npm", "start"]
