const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
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
};