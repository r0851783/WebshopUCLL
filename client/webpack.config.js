const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'Js'),
    filename: 'bundle.js'
  },
  devtool: "source-map"   
};

module.exports = config;