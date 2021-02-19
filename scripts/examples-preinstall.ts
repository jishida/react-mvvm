import { statSync } from 'fs';
import { exec, npm, pkg } from './utils';

async function main() {
  try {
    statSync(pkg.archive);
    console.log(`found '${pkg.archive}'`);
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
    await exec(npm, 'install');
    await exec(npm, 'run', 'build');
    await exec(npm, 'pack');
  }
}

main();
