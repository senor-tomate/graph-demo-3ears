const path = require('path')

module.exports = {
    devtool: 'source-app',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    
    module: {
        rules: [{
            test: /\.js$/, // include .js files
            enforce: "pre", // preload the jshint loader
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            include: path.join(__dirname, 'src'),
            use: {
                loader: "babel-loader"
            }
        }]
    },
}