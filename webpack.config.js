const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        publicPath: '/',
        filename: "bundle.js"
    },
    performance : {
      hints : false
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: [ /node_modules/ ],
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-react"]
                }
              }
            },
           {
             test: /\.css$/i,
             use: ['style-loader', 'css-loader'],
           },
           {
             test: /\.s[ac]ss$/i,
             use: ['style-loader', 'css-loader', 'sass-loader'],
           },
           {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
            },
        ]
    },
    mode: "production",
    devServer: {
        open: true,
        historyApiFallback: true,
        contentBase: "./"
    }
};
