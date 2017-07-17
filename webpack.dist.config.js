const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './app/React.tsx',
    './app/styles/index.scss',
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.json'],
  },
  output: {
    path: __dirname + '/www/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      // TODO compress / optimize images to 90% quality (but only on prod, not local building)
      { test: /\.(ttf|eot|svg|png|gif|jpe?g|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader' },
      { test: /\.tsx$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/ },
      {
        enforce: 'post',
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015", "react"],
          },
        },
      }
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CopyWebpackPlugin([
      { from: 'app/index.html' },
      { from: 'app/themes', to: 'themes' },
      { context: 'node_modules/expedition-art', from: '**/*.+(jpg|svg|png)', to: 'expedition-art' },
    ]),
    new Webpack.optimize.AggressiveMergingPlugin(),
    // new UglifyJSPlugin({minimize: true, mangle: false}), // currently broken
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
