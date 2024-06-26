FROM node:22.2.0-alpine3.20 as build-stage
RUN npm install pm2 -g
WORKDIR /app
COPY package*.json package-lock.json /app/
RUN yarn install


FROM build-stage as ssr 
ENV SSR=true
COPY . /app
COPY .env /app/.env

RUN yarn build
#ENV URL_CDN="https://ssr.metric.vn/_nuxt"
#CMD pm2-runtime start pm2.config.js --env production --only nuxtjs --name nuxtjs

FROM node:22.2.0-alpine3.20 as ssr-release
ENV NUXT_VERSION=3.9.0
WORKDIR /app
RUN yarn add "nuxt-start@${NUXT_VERSION}"
COPY --from=ssr /app/.nuxt /app/.nuxt
COPY --from=ssr /app/nuxt.config.ts /app/
COPY --from=ssr /app/.output /app/.output
ENTRYPOINT ["npx", "nuxt-start"]
EXPOSE 3000

FROM build-stage as spa
ENV SSR=false
COPY . /app
COPY .env /app/.env
RUN yarn build

FROM node:22.2.0-alpine3.20 as spa-release
ENV NUXT_VERSION=3.9.0
WORKDIR /app
RUN yarn add "nuxt-start@${NUXT_VERSION}"
COPY --from=spa /app/.nuxt /app/.nuxt
COPY --from=spa /app/nuxt.config.ts /app/
COPY --from=spa /app/.output /app/.output
ENTRYPOINT ["npx", "nuxt-start"]
EXPOSE 3000