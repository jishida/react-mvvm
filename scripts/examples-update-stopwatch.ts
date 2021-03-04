import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { mkdir, stopwatchExamples } from './utils';

const root = process.cwd();

function isPreactTypeCheck(example: string, name: string) {
  return (
    /\/webpack\/preact-without-compat$/.test(example) && name === 'index.tsx'
  );
}

function replaceGetElementById(text: string) {
  return text.replace(/getElementById\('root'\)/g, '$&!');
}

function updateStopwatch(
  baseExample: string,
  subExamples: ReadonlyArray<string>
) {
  const baseDir = resolve(root, 'examples', baseExample, 'src');
  const fileNames = readdirSync(baseDir);
  subExamples.forEach((example) => {
    mkdir(join('examples', example, 'src'));
  });
  fileNames.forEach((name) => {
    const baseFile = join(baseDir, name);
    const text = readFileSync(baseFile, 'utf8');

    subExamples.forEach((example) => {
      const isReplace = isPreactTypeCheck(example, name);
      const file = resolve(root, 'examples', example, 'src', name);
      writeFileSync(file, isReplace ? replaceGetElementById(text) : text, {
        encoding: 'utf8',
        mode: 0o644,
        flag: 'w',
      });
      console.log(`updated '${file}'${isReplace ? ' - replaced' : ''}`);
    });
  });
}

stopwatchExamples.forEach(([baseExample, subExamples]) => {
  updateStopwatch(baseExample, subExamples);
});
