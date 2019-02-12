#!/usr/bin/env sh

yarn clean --yes
docker-compose build
docker-compose up
