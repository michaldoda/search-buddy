const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index-standalone.js',
    output: {
        filename: 'development.js',
        path: path.resolve(__dirname, 'dev'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dev'),
        },
        compress: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};