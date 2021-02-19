module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    'minimal-app': './src/minimal-app/index.tsx',
    'viewmodel-app': './src/viewmodel-app/index.tsx',
    'stopwatch': './src/stopwatch/index.tsx',
    'material-ui-form': './src/material-ui-form/index.tsx',
  },
  output: {
    path: __dirname,
    filename: '[name]/index.js',
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
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: ['web', 'es5'],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@jishida/react-mvvm': 'ReactMVVM',
  },
};
