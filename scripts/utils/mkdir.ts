import { resolve } from 'path';
import { mkdirSync, statSync } from 'fs';

export default function mkdir(path: string) {
  const p = resolve(path);
  try {
    if (!statSync(p).isDirectory()) {
      throw new Error(`Fatal Error: ${path} is not directory.`);
    }
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
    mkdirSync(p, { recursive: true, mode: 0o755 });
    console.log(`created '${p}'`);
  }
}
