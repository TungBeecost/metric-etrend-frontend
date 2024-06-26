FROM node:22.2.0-alpine3.20 as build-stage
RUN npm install pm2 -g
WORKDIR /app
COPY package*.json package-lock.json /app/
RUN yarn install


FROM build-stage as ssr 
ENV SSR=true
COPY .env /app/.env
RUN yarn build
#ENV URL_CDN="https://ssr.metric.vn/_nuxt"
#CMD pm2-runtime start pm2.config.js --env production --only nuxtjs --name nuxtjs

FROM nginx:stable-alpine3.19 as ssr-release
COPY --from=ssr /app/_nuxt /usr/share/nginx/html
EXPOSE 80


FROM build-stage as spa
ENV SSR=false
COPY .env /app/.env
RUN yarn build
#ENV URL_CDN="https://ssr.metric.vn/_nuxt"
#CMD pm2-runtime start pm2.config.js --env production --only nuxtjs --name nuxtjs

FROM nginx:stable-alpine3.19 as spa-release
COPY --from=spa /app/_nuxt /usr/share/nginx/html
EXPOSE 80
