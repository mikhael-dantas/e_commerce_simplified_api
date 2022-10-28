FROM node:18.12
WORKDIR /backend
copy . .
RUN corepack enable