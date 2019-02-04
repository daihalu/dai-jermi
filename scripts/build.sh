#!/bin/sh

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

docker build -t jerni-api:$PACKAGE_VERSION .

docker tag jerni-api:$PACKAGE_VERSION jerni-api:latest
