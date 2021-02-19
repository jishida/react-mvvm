const { buildSync } = require('esbuild');

buildSync({
  define: { 'process.env.NODE_ENV': '"production"' },
  entryPoints: ['./src/index.tsx'],
  target: 'es6',
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  sourcemap: true,
  tsconfig: './tsconfig.json',
});
