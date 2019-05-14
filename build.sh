#!/bin/bash

VERSION_NO=$(grep -Po '(?<=version\":\s\")\d+\.\d+\.\d+' src/manifest.json)
cd src
zip -r ../'v'$VERSION_NO'.zip' *

