/*
 * @Author: tianyu
 * @Date: 2021-11-05 15:29:28
 * @Description:
 */
const path = require("path");
const RemoveStrict = require("./plugins/RemoveStrict");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");

module.exports = {
  mode: "production",
  entry: [path.resolve(__dirname, "src/index.js")],
  output: {
    filename: "bundle.js",
    library: {
      name: "openImgLayer",
      type: "umd",
      // auxiliaryComment: 'Test Comment'
    },
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  useBuiltIns: "usage",
                  corejs: 2,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new RemoveStrict(), new MiniCssExtractPlugin(), new WebpackBar()],
};
