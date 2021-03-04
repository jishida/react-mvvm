const { buildSync } = require('esbuild');

buildSync({
  entryPoints: ['./build/index.js'],
  target: 'es5',
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  sourcemap: true,
  tsconfig: './jsconfig.json',
});
