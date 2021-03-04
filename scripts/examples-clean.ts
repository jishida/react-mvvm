import { resolve } from 'path';
import { remove, examples } from './utils';

const targetDirs = ['build', 'dist'];

if (process.argv[3] === 'all') {
  targetDirs.push('node_modules');
}

function clean(path: string) {
  targetDirs.forEach((name) => {
    remove(resolve('examples', path, name));
  });
}

examples.forEach((example) => {
  clean(example);
});
