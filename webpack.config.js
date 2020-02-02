const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    app: "./public/index.js",
    db: "./public/db.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "my-domain-cache-id",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budgy",
      description:
        "An application that allows you to keep track of your budget.",
      background_color: "#01579b",
      theme_color: "#8A33FE",
      "theme-color": "#8A33FE",
      start_url: "/",
      icons: [
        {
          src: path.resolve("public/images/budgy-icon-512.png"),
          sizes: [64, 128, 512],
          destination: path.join("images")
        }
      ]
    })
  ]
};

module.exports = config;
