import { resolve, relative } from 'path';
import { statSync, rmdirSync, unlinkSync } from 'fs';

function isProjectContent(path: string) {
  const rel = relative(resolve(''), path);
  return !/^((|\.\.|\.git)$|\.git[/\\]|\.\.[/\\])/.test(rel);
}

export default function remove(path: string) {
  const p = resolve(path);
  if (!isProjectContent(p)) {
    throw new Error(`remove: Invalid argument '${path}'`);
  }
  try {
    const stat = statSync(p);
    if (stat.isDirectory()) {
      rmdirSync(p, { recursive: true });
      console.log(`removed '${p}'`);
    } else if (stat.isFile() || stat.isSymbolicLink()) {
      unlinkSync(p);
      console.log(`removed '${p}'`);
    }
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
}
