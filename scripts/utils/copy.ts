import { copySync } from 'fs-extra';
import { resolve } from 'path';
import mkdir from './mkdir';

export default function copy(srcDir: string, destDir: string) {
  mkdir(destDir);
  const src = resolve(srcDir);
  const dest = resolve(destDir);
  copySync(src, dest);
  console.log(`copied '${src}' to '${dest}'`);
}
