#!/bin/sh

BASEDIR=$(dirname $(realpath "$0"))

# Build zip file containing public resources
cd $BASEDIR/../challenge/
java Ransom.java  # Create flag.important.hax
javac Ransom.java -source 11 -target 11
jar cfm ransom.jar manifest.mf Ransom.class
zip -q $BASEDIR/artifacts.zip flag.important.hax ransom.jar
rm Ransom.class Ransom.jar flag.important.hax

# Rename zip file to include its sha256
SHA=$(sha256sum $BASEDIR/artifacts.zip | cut -d" " -f1)
mv $BASEDIR/artifacts.zip "$BASEDIR/javansomware_$SHA.zip"
