const webpack = require('webpack');

const base = require('./base');
const prod = Object.assign({}, base);

const env = Object.assign(
    require('../firebase/prod'),
    {NODE_ENV: JSON.stringify('production')}
);

prod.devtool = 'source-map';
prod.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({'process.env': env}),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })
];

module.exports = prod;
