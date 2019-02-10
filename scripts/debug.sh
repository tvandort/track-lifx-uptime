#!/usr/bin/env sh

docker-compose build
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
