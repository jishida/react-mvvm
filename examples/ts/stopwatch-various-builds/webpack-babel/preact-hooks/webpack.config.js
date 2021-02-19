const { resolve } = require('path');

const preact = resolve(__dirname, 'node_modules/preact/dist/preact.js');
const preactHooks = resolve(
  __dirname,
  'node_modules/preact/hooks/dist/hooks.js'
);

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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react', '@babel/typescript'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      preact$: preact,
      'preact/hooks$': preactHooks,
      react$: preact,
      'react-dom$': preact,
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: ['web', 'es5'],
};
