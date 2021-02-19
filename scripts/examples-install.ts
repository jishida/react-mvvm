import { resolve } from 'path';
import { exec, examples, npm } from './utils';

const root = process.cwd();

async function install(path: string) {
  process.chdir(resolve(root, 'examples', path));
  await exec(npm, 'install');
}

async function main() {
  for (const example of examples) {
    await install(example);
  }
}

main();
