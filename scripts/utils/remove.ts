import { resolve } from 'path';
import { statSync, rmdirSync, unlinkSync } from 'fs';

export default function remove(path: string) {
  const p = resolve(path);
  if (p === resolve('')) {
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
