#!/bin/sh

BASEDIR=$(dirname $(realpath "$0"))

# Build zip file containing public resources
cd $BASEDIR/../challenge/
zip -q $BASEDIR/artifacts.zip flag.important.hax ransom.py

# Rename zip file to include its sha256
SHA=$(sha256sum $BASEDIR/artifacts.zip | cut -d" " -f1)
mv $BASEDIR/artifacts.zip "$BASEDIR/ranxorware_$SHA.zip"
