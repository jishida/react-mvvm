const { buildSync } = require('esbuild');

buildSync({
  define: { 'process.env.NODE_ENV': '"production"' },
  entryPoints: ['./build/index.js'],
  target: 'es5',
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  sourcemap: true,
  tsconfig: './jsconfig.json',
});
