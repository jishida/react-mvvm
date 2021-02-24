import { resolve } from 'path';
import { exec, examples, npm } from './utils';
import pkg from '../package.json';

async function main() {
  const matches = pkg.version.match(/^[0-9]+\.[0-9]+/);
  const specifier = matches ? `@^${matches[0]}` : '';
  const packageName = `${pkg.name}${specifier}`;

  const root = resolve('examples');
  examples.reduce(async (promise, example) => {
    await promise;
    const dir = resolve(root, example);
    process.chdir(dir);
    console.log(`cd: ${dir}`);
    await exec(npm, 'install', packageName);
  }, Promise.resolve());
}

main();
