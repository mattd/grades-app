const webpack = require('webpack');

const base = require('./base');
const dev = Object.assign({}, base);

const env = Object.assign(
    require('../firebase/local'),
    {NODE_ENV: JSON.stringify('development')}
);

dev.debug = true;
dev.devtool = 'eval';
dev.entry.unshift('webpack-hot-middleware/client');
dev.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env': env}),
    new webpack.NoErrorsPlugin()
];

module.exports = dev;
