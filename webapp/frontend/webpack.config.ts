import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
    mode: "development",

    entry: "./src/index.tsx",

    output: {
        filename: "bundle.js",
        path: `${__dirname}/dist`
    },

    devtool: "source-map",

    devServer: {
        contentBase: `${__dirname}/dist`,
        host: "0.0.0.0",
        port: 8888,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Melanoma Classifier"
        })
    ]
}

export default config;
