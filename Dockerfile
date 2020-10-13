FROM node:latest-alpine
LABEL maintainer="viniferraria"
EXPOSE 3000
WORKDIR /usr/src/webarber
ENV NODE_ENV=test
ENV APP_SECRET=cyberbarber-2077
COPY package.json ./
RUN yarn install
RUN yarn sequelize db:migrate
COPY ./src ./src
RUN groupadd -r webarber && useradd -r -g webarber webarber
USER webarber
ENTRYPOINT ["yarn", "dev"]