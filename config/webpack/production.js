const webpack = require('webpack');

const base = require('./base');
const version = require('../../package').version;
const production = Object.assign({
    mode: 'production',
    devtool: 'source-map',
    optimizations: {
        minimize: true
    }
}, base);

const env = Object.assign(
    require('../firebase/' + process.env['FIREBASE_ENV']),
    {
        NODE_ENV: JSON.stringify('production'),
        BUILD_COMMIT: JSON.stringify(process.env['BUILD_COMMIT']),
        BUILD_TIMESTAMP: process.env['BUILD_TIMESTAMP'],
        BUILD_VERSION: JSON.stringify(version)
    }
);

production.plugins = [
    new webpack.DefinePlugin({'process.env': env}),
    new webpack.SourceMapDevToolPlugin({
        filename: '../../public/static/bundle.js.map'
    })
];

module.exports = production;