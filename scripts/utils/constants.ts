import { readFileSync } from 'fs';

export const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
export const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const pkgJson = readFileSync('./package.json', 'utf8');
const _pkg: { name: string; version: string; archive: string } = JSON.parse(
  pkgJson
);

_pkg.archive = `${_pkg.name.replace(/^@/, '').replace(/\//, '-')}-${
  _pkg.version
}.tgz`;

export const pkg: Readonly<typeof _pkg> = _pkg;

export const stopwatchExamples: ReadonlyArray<
  Readonly<[string, ReadonlyArray<string>]>
> = [
  [
    'ts/stopwatch',
    [
      'ts/stopwatch-various-builds/esbuild-babel/react',
      'ts/stopwatch-various-builds/esbuild-babel/react-cdn',
      'ts/stopwatch-various-builds/esbuild-babel/preact',
      'ts/stopwatch-various-builds/esbuild-babel/preact-without-compat',
      'ts/stopwatch-various-builds/esbuild-tsc/react',
      'ts/stopwatch-various-builds/esbuild-tsc/react-cdn',
      'ts/stopwatch-various-builds/esbuild-tsc/preact',
      'ts/stopwatch-various-builds/esbuild-tsc/preact-without-compat',
      'ts/stopwatch-various-builds/esbuild-es6/react',
      'ts/stopwatch-various-builds/esbuild-es6/react-cdn',
      'ts/stopwatch-various-builds/esbuild-es6/preact',
      'ts/stopwatch-various-builds/esbuild-es6/preact-without-compat',
      'ts/stopwatch-various-builds/webpack/react',
      'ts/stopwatch-various-builds/webpack/react-cdn',
      'ts/stopwatch-various-builds/webpack/preact',
      'ts/stopwatch-various-builds/webpack/preact-without-compat',
      'ts/stopwatch-various-builds/webpack-babel/react',
      'ts/stopwatch-various-builds/webpack-babel/react-cdn',
      'ts/stopwatch-various-builds/webpack-babel/preact',
      'ts/stopwatch-various-builds/webpack-babel/preact-without-compat',
      'ts/stopwatch-various-builds/parcel/react',
      'ts/stopwatch-various-builds/parcel/react-cdn',
      'ts/stopwatch-various-builds/parcel/preact',
    ],
  ],
];

export const examples: ReadonlyArray<string> = [
  'js/minimal-app',
  'js/viewmodel-app',
  'js/stopwatch',
  'js/material-ui-form',
  'ts/minimal-app',
  'ts/viewmodel-app',
  'ts/material-ui-form',
  'ts/di-with-awilix',
].concat(
  stopwatchExamples.flatMap(([baseExample, subExamples]) => [
    baseExample,
    ...subExamples,
  ])
);

export const buildExampleNames = [
  'minimal-app',
  'viewmodel-app',
  'stopwatch',
  'material-ui-form',
  'di-with-awilix',
];
