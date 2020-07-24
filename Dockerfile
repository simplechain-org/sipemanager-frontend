FROM node:12.16 AS BUILD
WORKDIR /home/app
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org \
    && npm run build
FROM nginx:latest AS PROD
WORKDIR /usr/share/nginx/html
COPY --from=0 /home/app/dist /usr/share/nginx/html
