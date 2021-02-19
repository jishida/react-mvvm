import { readdirSync } from 'fs';
import { resolve } from 'path';

export default function listFiles(directory: string) {
  const dir = resolve(directory);
  return readdirSync(dir, { encoding: 'utf8', withFileTypes: true })
    .filter((ent) => ent.isFile())
    .map((ent) => ent.name);
}
