const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
require("dotenv").config();

module.exports = (env = {}) => {
  const { mode = "development", context = "/" } = env;

  const { API_URL, TWILIO_API_SECRET, TWILIO_API_KEY, TWILIO_ACCOUNT_SID } =
    process.env;

  let publicPath = context;

  let src = path.resolve(__dirname, "src");

  let output = path.resolve(__dirname, "dist");

  let is_development = mode === "development";

  return {
    mode,
    devtool: is_development ? "source-map" : false,
    entry: [path.resolve(src, "index.ts"), path.resolve(src, "index.scss")],
    output: {
      path: output,
      publicPath,
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: "vendor",
            enforce: true,
            chunks: "initial",
          },
        },
      },
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
        },
        {
          test: /index\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["sass-loader"],
        },
        {
          test: /\.css$/,
          use: ["css-loader"],
        },
        {
          test: /\.(svg|jpg|png|jpeg|gif|eot|woff|ttf|ico|pdf)/,
          use: "file-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".json", ".ts", ".tsx"],
    },
    devServer: {
      contentBase: output,
      writeToDisk: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        env: JSON.stringify({
          API_URL,
          TWILIO_ACCOUNT_SID,
          TWILIO_API_SECRET,
          TWILIO_API_KEY,
        }),
      }),

      new MiniCssExtractPlugin({
        chunkFilename: "[name].css",
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: "./src/index.ejs",
      }),
    ],
  };
};
