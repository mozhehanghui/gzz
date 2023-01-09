FROM node:16.18.0-alpine3.16 as build

WORKDIR /app

COPY . .
RUN rm -rf node_modules \
    && yarn install --registry=https://registry.npm.taobao.org \
    && if [ $? -ne 0 ] ;then echo "install dependencies failed";exit 1;fi \
    && yarn build \
    && if [ $? -ne 0 ] ;then echo "build failed";exit 1;fi

# deploy
FROM nginx:stable-alpine
LABEL maintainer="rh"
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/
EXPOSE 80

