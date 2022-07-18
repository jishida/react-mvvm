import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { execFileSync, SpawnSyncReturns } from 'child_process';

function tsconfig(key: string, options: any) {
  const file = resolve(`build/tsconfig.${key}.json`);
  const opts = { ...options, extends: '../tsconfig.json' };
  opts.compilerOptions = {
    ...opts.compilerOptions,
    sourceMap: true,
    inlineSources: true,
    incremental: true,
    tsBuildInfoFile: `./${key}.tsbuildinfo`,
    outDir: key === 'types' ? '../types' : `./${key}`,
  };
  writeFileSync(file, JSON.stringify(opts, null, 2), 'utf8');
  return file;
}

export default function compile(expr: string, opts: any) {
  const key = expr.replace(/\//, '-');
  const tsconfigFile = tsconfig(key, opts);
  const args: string[] = [
    'node_modules/typescript/lib/tsc.js',
    '--build',
    tsconfigFile,
  ];

  try {
    execFileSync('node', args);
    console.log(`compiled '${key}'`);
  } catch (e) {
    console.log((e as SpawnSyncReturns<Buffer>).stdout.toString('utf8'));
    throw e;
  }
}
