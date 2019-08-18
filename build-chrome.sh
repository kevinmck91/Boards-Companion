#!/bin/bash

VERSION_NO=$(grep -Po '(?<=version\":\s\")\d+\.\d+\.\d+' dist/release/Chrome/manifest.json)
cd dist/release/Chrome
zip -r ./'v'$VERSION_NO'.zip' *

