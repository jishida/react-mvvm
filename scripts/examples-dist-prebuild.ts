import { resolve } from 'path';
import { buildExampleNames, copy, remove } from './utils';

const distDir = resolve('examples/dist');
const buildSrcDir = resolve(distDir, 'src');

remove(buildSrcDir);

buildExampleNames.forEach((name) => {
  const jsDir = resolve(distDir, name, 'js');
  remove(jsDir);
});

buildExampleNames.forEach((name) => {
  const src = resolve('examples/ts', name, 'src');
  const dest = resolve(buildSrcDir, name);
  copy(src, dest);
});
