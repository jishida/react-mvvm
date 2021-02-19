import { readdirSync } from 'fs';
import { remove } from './utils';

const defaultPaths = [
  'build',
  'coverage',
  'dist',
  'cjs',
  'esm',
  'types',
  'lite/cjs',
  'lite/esm',
  'lite/types',
];

const args = process.argv.slice(3).filter((a) => !!a);
if (!args.length) {
  args.push('default');
}
const paths = new Set<string>();

args.forEach((a) => {
  switch (a) {
    case 'all':
      paths.add('node_modules');
      readdirSync('.', 'utf8').forEach((p) => {
        if (p.endsWith('.tgz')) {
          paths.add(p);
        }
      });
    // fall through
    case 'default':
      defaultPaths.forEach((p) => {
        paths.add(p);
      });
      break;
    default:
      paths.add(a);
  }
});

paths.forEach((p) => {
  remove(p);
});
