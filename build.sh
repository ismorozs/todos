#!/bin/bash

rm -rf ./dist/*

CURRENT_TIME=$( date +%s )

COMMON_ARGUMENTS="--mode=production --env.VERSION_NUMBER=${CURRENT_TIME} --env.PORT=${PORT} --env.API_URL=${API_URL}"

./node_modules/webpack/bin/webpack.js $COMMON_ARGUMENTS --config ./webpack.client.config.js
./node_modules/webpack/bin/webpack.js $COMMON_ARGUMENTS --config ./webpack.server.config.js
