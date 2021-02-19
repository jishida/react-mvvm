import { copyFileSync } from 'fs';
import { resolve } from 'path';
import listFiles from './listFiles';
import mkdir from './mkdir';

export interface CopyOptions {
  search?: string | RegExp;
  replace?: string;
}

export default function copy(srcDir: string, destDir: string) {
  mkdir(destDir);
  listFiles(srcDir).forEach((file) => {
    const src = resolve(srcDir, file);
    const dest = resolve(destDir, file);
    copyFileSync(src, dest);
    console.log(`copied '${src}' to '${dest}'`);
  });
}
