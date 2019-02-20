#!/usr/bin/env sh

# yarn tsc
node $1 -r ts-node/register src/index.ts
