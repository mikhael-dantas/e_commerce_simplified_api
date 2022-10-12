# setup environment with nodejs, copy everything besides node_modules, install dependencies, build, and run
FROM node:18.12
WORKDIR /back
COPY . .
RUN corepack enable