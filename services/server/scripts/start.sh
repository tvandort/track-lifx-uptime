#!/usr/bin/env sh

yarn tsc
node $1 build/index.js
