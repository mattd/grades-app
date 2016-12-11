const webpack = require('webpack');

const base = require('./base');
const production = Object.assign({}, base);

const env = Object.assign(
    require('../firebase/' + process.env.FIREBASE_ENV),
    {NODE_ENV: JSON.stringify('production')}
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