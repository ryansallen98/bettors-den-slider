const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        // Styles and scripts to be bundled
        script: './src/js/bd-carousel.js',
        styles: './src/scss/bd-carousel.scss',

        // Blocks
        slide: './src/blocks/slide/slide.js',
        slider: './src/blocks/slider/slider.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // Output JS file (e.g., slider.js)
    },
    module: {
        rules: [
            // Rule for JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            // Rule for SCSS
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS into a separate file
                    'css-loader', // Turns CSS into JS modules
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output CSS file (e.g., style.css)
        }),
    ],
    externals: {
        '@wordpress/blocks': ['wp', 'blocks'],
        '@wordpress/block-editor': ['wp', 'blockEditor'],
        '@wordpress/components': ['wp', 'components'],
        '@wordpress/element': ['wp', 'element'],
    },
    mode: 'production', // or 'development' depending on your environment
    devtool: 'source-map', // Optional: Generates source maps for easier debugging
};