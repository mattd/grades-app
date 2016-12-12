const path = require('path');

const appRootPath = require('app-root-path').toString();
const webpack = require('webpack');

const base = require('./base');
const version = require('../../package').version;
const development = Object.assign({}, base);

const env = Object.assign(
    require('../firebase/integration'),
    {
        NODE_ENV: JSON.stringify('development'),
        BUILD_COMMIT: JSON.stringify(process.env['BUILD_COMMIT']),
        BUILD_TIMESTAMP: process.env['BUILD_TIMESTAMP'],
        BUILD_VERSION: JSON.stringify(version)
    }
);

development.debug = true;
development.devtool = 'eval';
development.entry.unshift('webpack-hot-middleware/client');
development.module.preLoaders = [{
    test: /\.js$/,
    loader: 'eslint-loader',
    include: [path.resolve(appRootPath, 'src/js')]
}];
development.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env': env}),
    new webpack.NoErrorsPlugin()
];

module.exports = development;