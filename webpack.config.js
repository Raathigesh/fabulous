const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = env => ({
  entry: "./src/ui/index.tsx",
  mode: env.production ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "./dist/ui"),
    filename: "ui.bundle.js",
    publicPath: "http://localhost:9000/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/ui"),
    hot: true,
    port: 9000,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "PaintBox",
      template: require("html-webpack-template"),
      appMountId: "root",
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: env.production === true
    })
  ]
});
