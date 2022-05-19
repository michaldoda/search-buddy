const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index-standalone.js',
    output: {
        filename: 'standalone.min.js',
        path: path.resolve(__dirname, 'dist'),
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