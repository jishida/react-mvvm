import { resolve } from 'path';
import { statSync, readFileSync, writeFileSync } from 'fs';
import { fileSync as gzipSize } from 'gzip-size';
import { mkdir } from './utils';

const fullMinified = (
  statSync(resolve('dist/react-mvvm.min.js')).size / 1024
).toFixed(1);

const fullGzipped = (
  gzipSize(resolve('dist/react-mvvm.min.js')) / 1024
).toFixed(1);

const liteMinified = (
  statSync(resolve('dist/react-mvvm-lite.min.js')).size / 1024
).toFixed(1);

const liteGzipped = (
  gzipSize(resolve('dist/react-mvvm-lite.min.js')) / 1024
).toFixed(1);

const fileSizeScope = `<!--- begin file size scope --->

full:

![](https://img.shields.io/badge/minified%20size-${fullMinified}%20kB-blue.svg)
![](https://img.shields.io/badge/gzipped%20size-${fullGzipped}%20kB-blue.svg)

lite:

![](https://img.shields.io/badge/minified%20size-${liteMinified}%20kB-blue.svg)
![](https://img.shields.io/badge/gzipped%20size-${liteGzipped}%20kB-blue.svg)

<!--- end file size scope --->`;

const readmeFile = resolve('README.md');

mkdir(resolve('build'));

const readme = readFileSync(resolve('README.md'), 'utf8');

const lines: string[] = [];
let ignore = false;

readme.split('\n').forEach((line) => {
  if (ignore) {
    if (/^\s*<!---\s*end\s*file\s*size\s*scope\s*--->/.test(line)) {
      ignore = false;
    }
  } else if (/^\s*<!---\s*begin\s*file\s*size\s*scope\s*--->/.test(line)) {
    ignore = true;
    lines.push(fileSizeScope);
  } else {
    lines.push(line);
  }
});

writeFileSync(readmeFile, lines.join('\n'), 'utf8');
