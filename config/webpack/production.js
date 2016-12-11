const execSync = require('child_process').execSync;

const webpack = require('webpack');

const base = require('./base');
const production = Object.assign({}, base);

const commit = execSync('git rev-parse --short HEAD').toString().trim();
const date = execSync('date -u').toString().trim();

const env = Object.assign(
    require('../firebase/' + process.env.FIREBASE_ENV),
    {
        NODE_ENV: JSON.stringify('production'),
        BUILD_COMMIT: JSON.stringify(commit),
        BUILD_DATE: JSON.stringify(date)
    }
);

production.devtool = 'source-map';
production.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({'process.env': env}),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })
];

module.exports = production;