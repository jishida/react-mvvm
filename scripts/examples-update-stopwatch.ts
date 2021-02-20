import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { mkdir, stopwatchExamples } from './utils';

const root = process.cwd();

function insertPreactHooks(source: string) {
  const lines = source.split('\n');
  const lastIndex = [...lines]
    .reverse()
    .findIndex((line) => /^import /.test(line));
  const index = lastIndex >= 0 ? lines.length - lastIndex - 1 : -1;

  return `${lines.slice(0, index + 1).join('\n')}
import { setHooks } from '@jishida/react-mvvm';
import preactHooks from 'preact/hooks';

setHooks(preactHooks);
${lines.slice(index + 1).join('\n')}`;
}

function isPreactHooksExample(example: string) {
  return /\/(webpack(-babel)?|parcel)\/preact-hooks$/.test(example);
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
    const baseText = readFileSync(baseFile, 'utf8');
    const hookText = /^index\.[jt]sx$/.test(name)
      ? insertPreactHooks(baseText)
      : undefined;

    subExamples.forEach((example) => {
      const isHook = !!hookText && isPreactHooksExample(example);
      const text = isHook ? hookText : baseText;
      const file = resolve(root, 'examples', example, 'src', name);
      writeFileSync(file, text, { encoding: 'utf8', mode: 0o644, flag: 'w' });
      console.log(`updated '${file}'${isHook ? ' - hook' : ''}`);
    });
  });
}

stopwatchExamples.forEach(([baseExample, subExamples]) => {
  updateStopwatch(baseExample, subExamples);
});
