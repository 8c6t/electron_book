const path = require('path');

module.exports = {
  name: 'electron_markdown',
  mode: 'production',
  target: 'electron-main',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    'main/index': './src/main/index.js',
    'renderer/index': './src/renderer/index.jsx',
    'renderer/pdf': './src/renderer/pdf.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ],
      },
    ]
  },
};
