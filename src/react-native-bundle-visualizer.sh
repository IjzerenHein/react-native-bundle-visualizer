#!/bin/bash

DIR=./node_modules/react-native-bundle-visualizer/src
CONFIG_FILE=$DIR/webpack.haul.js
if [ -f ./webpack.haul.js ]; then
  CONFIG_FILE2=$DIR/webpack.haul.extend.js
fi

./node_modules/.bin/haul bundle --config $CONFIG_FILE --platform ios
if [ $? -eq 0 ]; then
	open ./stats.html
fi
