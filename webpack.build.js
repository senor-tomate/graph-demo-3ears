
/* eslint-disable */
const path = require('path')
const webpack = require('webpack-cli')

const ENVIRONMENT = process.env.NODE_ENV
const PRODUCTION  = ENVIRONMENT === 'production'
const SOURCEMAP   = !PRODUCTION || process.env.SOURCEMAP

const library = 'graph-demo-3ears' // << RENAME THIS <<
const filename = PRODUCTION ? `${library}.min.js` : `${library}.js`

const plugins = []

if (PRODUCTION) {
    plugins.push(
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: { comments: false, semicolons: true },
        sourceMap: SOURCEMAP,
        })
    )
}

module.exports = {
    devtool: SOURCEMAP ? 'source-map' : 'none',
    entry: {
        // index:   { import: './src/index.js', dependOn: 'shared' },
        // another: { import: './src/another-module.js', dependOn: 'shared' },
        // shared: 'lodash',
        index: './src/index.js'

        // /* Attempsts @ splitting data from bundle. */
        // index: {import : './src/index.js', dependOn: '_lemma_MASTER3', filename: "index.js"},
        // _lemma_MASTER3: {import: './data/_lemma_MASTER3.json', filename: "_lemma_MASTER3.json"}
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        '@material-ui': '@material-ui',
        '@material-ui/core': '@material-ui/core',
        'plotly.js' : 'plotly.js',
        'react-plotly.js': 'react-plotly.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                enforce: "pre",
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                include: [path.join(__dirname, 'src')],
                use: {
                    loader: "babel-loader"
                }
            },
            // /* Attempt @ splitting data from bundle. */
            // {
            //     test: /\.json$/,
            //     use: {
            //         loader: "json-loader"
            //     }
            // }
        ]
    },
    output: {
        filename,
        library,
        path:           `${__dirname}/build`,
        libraryTarget:  'umd',
        umdNamedDefine: true,
    },
    plugins,
}
