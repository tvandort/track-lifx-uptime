FROM node:alpine

RUN ls -la

WORKDIR /usr/src

COPY package.json ./

RUN yarn

COPY . . 

CMD ["yarn", "start"]
