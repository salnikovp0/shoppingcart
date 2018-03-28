const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};


// const config = {
//   devtool: 'cheap-module-source-map',
//   entry: [
//     // 'webpack-hot-middleware/client',
//     'babel-polyfill',
//     APP_DIR + '/index.js'
//   ],
//   output: {
//     path: APP_DIR,
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   //  entry: {
//   //    main: APP_DIR + '/index.js'
//   //  },
//   //  output: {
//   //    filename: 'bundle.js',
//   //    path: BUILD_DIR,
//   //    publicPath: '/',
//   //  },
//    module: {
//     rules: [
//      {
//        test: /(\.css|.scss)$/,
//        use: [{
//            loader: "style-loader" // creates style nodes from JS strings
//        }, {
//            loader: "css-loader" // translates CSS into CommonJS
//        }, {
//            loader: "sass-loader" // compiles Sass to CSS
//        }]
//      },
//      {
//        test: /\.(jsx|js)?$/,
//        use: [{
//          loader: "babel-loader",
//          options: {
//            cacheDirectory: true,
//            presets: ['react', 'es2015', 'stage-0'] // Transpiles JSX and ES6
//          }
//        }]
//      }
//     ],
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify('development'),
//         PLATFORM_ENV: JSON.stringify('web')
//       },
//     }),
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin(),
//   ],
// };

// module.exports = config;