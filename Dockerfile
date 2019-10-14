FROM node:12.11.1-alpine
RUN mkdir /src
EXPOSE 3000
WORKDIR /src
ADD . /src/
RUN ["yarn"]
CMD ["yarn", "start"]
