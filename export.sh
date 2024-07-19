#!/bin/sh
set -o allexport
source .env
set +o allexport
if [[ "SSR" == "true" ]]; then
    export NUXT_APP_CDN_URL=${BASE_URL}
else
    export NUXT_APP_CDN_URL=${BASE_URL}/ssr 
fi

npm run start 