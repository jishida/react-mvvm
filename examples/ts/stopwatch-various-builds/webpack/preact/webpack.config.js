const { resolve } = require('path');

const preact = resolve(__dirname, 'node_modules/preact/compat');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    alias: {
      react: preact,
      'react-dom': preact,
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: ['web', 'es5'],
};
