#!/usr/bin/env sh

yarn clean --yes
docker-compose build
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
