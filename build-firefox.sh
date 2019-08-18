#!/bin/bash

VERSION_NO=$(grep -Po '(?<=version\":\s\")\d+\.\d+\.\d+' dist/release/Firefox/manifest.json)
cd dist/release/Firefox
zip -r ./'v'$VERSION_NO'.zip' *

