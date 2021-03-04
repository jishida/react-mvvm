const { buildSync } = require('esbuild');

buildSync({
  entryPoints: ['./src/index.tsx'],
  target: 'es6',
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  sourcemap: true,
  tsconfig: './tsconfig.json',
});
