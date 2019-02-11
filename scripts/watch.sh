#!/usr/bin/env sh

docker-compose build
docker-compose -f docker-compose.watch.yml up
