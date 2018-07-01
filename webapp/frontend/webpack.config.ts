
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as HtmlWebpackTemplate from 'html-webpack-template'

const config: webpack.Configuration = {
    mode: 'development',

    entry: 'src/index.ts',

    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`
    },

    devtool: 'source-map',

    devServer: {
        contentBase: `${__dirname}/dist`,
        port: 8888,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: HtmlWebpackTemplate,
            appMountId: 'app',
            mobile: true,
            lang: 'en-US',
            links: [
                'https://fonts.googleapis.com/css?family=Roboto'
            ],
            title: 'Melanoma Classifier'
        })
    ]
}

export default config;
