const path = require("path");

module.exports = {
  entry: "./pages/_app.js",
  output: {
    path: path.resolve("/pages", "dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000"
      }
    ]
  }
};
