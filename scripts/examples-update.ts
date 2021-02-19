import { resolve } from 'path';
import { exec, npm, pkg, examples } from './utils';

const root = process.cwd();

async function update(path: string) {
  process.chdir(resolve(root, 'examples', path));
  await exec(npm, 'install', resolve(root, pkg.archive));
}

async function main() {
  await exec(npm, 'run', 'examples:preinstall');
  for (const example of examples) {
    await update(example);
  }
}

main();
