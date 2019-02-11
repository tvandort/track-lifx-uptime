#!/usr/bin/env sh

tsc
echo aaaaaaaaaaaaaaaahhhajskdkaj
echo $DATABASE_URL
yarn migrate up
node $1 build/index.js