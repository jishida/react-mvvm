import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export default function generateLite(source: string, destination: string) {
  const src = resolve(source);
  const dest = resolve(destination);
  const text = readFileSync(resolve(src), 'utf8');
  let ignore = false;
  const lines = text.split('\n').reduce<string[]>((arr, line) => {
    if (ignore) {
      if (/^\s*\/\/\s*end\s*extensions\s*scope/.test(line)) {
        ignore = false;
      }
    } else if (/^\s*\/\/\s*begin\s*extensions\s*scope/.test(line)) {
      ignore = true;
      arr.push('// omitted extensions scope');
    } else if (!/\/\/\s*extensions\s*line\s*$/.test(line)) {
      arr.push(line);
    } else {
      arr.push('// omitted extensions line');
    }
    return arr;
  }, []);
  writeFileSync(resolve(dest), lines.join('\n'), 'utf8');
  console.log(`generated '${dest}' from '${src}'`);
}
