const execSync = require('child_process').execSync;
const path = require('path');

const appRootPath = require('app-root-path').toString();
const webpack = require('webpack');

const base = require('./base');
const development = Object.assign({}, base);

const commit = execSync('git rev-parse --short HEAD').toString().trim();
const date = execSync('date -u').toString().trim();

const env = Object.assign(
    require('../firebase/integration'),
    {
        NODE_ENV: JSON.stringify('development'),
        BUILD_COMMIT: JSON.stringify(commit),
        BUILD_DATE: JSON.stringify(date)
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