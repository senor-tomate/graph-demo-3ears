
/* eslint-disable */
const path = require('path')
const webpack = require('webpack-cli')

const ENVIRONMENT = process.env.NODE_ENV
const PRODUCTION  = ENVIRONMENT === 'production'
const SOURCEMAP   = !PRODUCTION || process.env.SOURCEMAP

const library = 'graph-demo-3ears' // << RENAME THIS <<
const filename = PRODUCTION ? `${library}.min.js` : `${library}.js`

const plugins = []

console.log("STARTING")

if (PRODUCTION) {
    console.log("PRODUCTION")
    plugins.push(
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: { comments: false, semicolons: false },
      sourceMap: SOURCEMAP,
    })
  )
}

module.exports = {
  devtool: SOURCEMAP ? 'source-map' : 'none',
  entry:  `${__dirname}/src/index.js`, // << RENAME THIS <<
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
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
