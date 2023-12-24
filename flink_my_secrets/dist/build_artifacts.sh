#!/bin/sh

BASEDIR=$(dirname $(realpath "$0"))

# Build zip file containing public resources
cd $BASEDIR/../challenge/
cp docker-compose.yml docker-compose.yml.bak
sed -i '/FLAG=/c\        FLAG=flag{FAKE_FLAG}' docker-compose.yml
zip -q -r $BASEDIR/artifacts.zip docker-compose.yml
mv docker-compose.yml.bak docker-compose.yml

# Rename zip file to include its sha256
SHA=$(sha256sum $BASEDIR/artifacts.zip | cut -d" " -f1)
mv $BASEDIR/artifacts.zip "$BASEDIR/flink_my_secrets_$SHA.zip"
