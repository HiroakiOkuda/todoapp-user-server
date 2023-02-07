FROM node:18.13.0
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build

ENTRYPOINT ["yarn", "start:user:dev"]