const webpack = require('webpack');

const base = require('./base');
const local = Object.assign({}, base);

const env = Object.assign(
    require('../firebase/local'),
    {NODE_ENV: JSON.stringify('development')}
);

local.debug = true;
local.devtool = 'eval';
local.entry.unshift('webpack-hot-middleware/client');
local.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env': env}),
    new webpack.NoErrorsPlugin()
];

module.exports = local;