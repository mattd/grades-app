const webpack = require('webpack');

const base = require('./base');
const version = require('../../package').version;
const production = Object.assign({
    mode: 'production',
    devtool: 'source-map'
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
    new webpack.DefinePlugin({'process.env': env})
];
production.optimization = {
    minimize: true,
    minimizer: new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
            warnings: false
        }
    })
};

module.exports = production;