const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("@babel/register");

module.exports =  {
    devtool: 'source-map',
    entry: [
        "@babel/polyfill",
        "./src/index.js",
    ],
    output: {
        path: __dirname + "/public",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: ["url-loader"]
            },
            {
                test: /\.glsl$/,
                use: ["webpack-glsl-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./src/favicon.ico",
            filename: __dirname + "/public/index.html",
            template: "src/index.html",
        })
    ],
    resolve: {
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules"),
        ]
    },
    devServer: {
        contentBase: __dirname + "/public",
        compress: true,
        port: 8080,
        open: false,
        stats: {
            assets: false,
            children: false,
            chunks: false,
            chunkModules: false,
            colors: true,
            entrypoints: false,
            hash: false,
            modules: false,
            timings: false,
            version: false,
        },
    },
    watch: false
};
