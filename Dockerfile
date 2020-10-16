FROM node
LABEL maintainer="viniferraria"
EXPOSE 3000
WORKDIR /usr/src/webarber
ENV NODE_ENV=test
ENV APP_SECRET=cyberbarber-2077
COPY . .
RUN chmod +x wait-for-it.sh
RUN yarn install --production=false
RUN groupadd -r webarber && useradd -r -g webarber webarber
USER webarber
