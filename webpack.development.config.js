const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'development.js',
        path: path.resolve(__dirname, 'dev'),
    },
    devServer: {
        port: 3000,
        watchContentBase: false,
        stats: "errors-only",
    },
};