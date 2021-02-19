import {
  copy,
  compile,
  remove,
  mkdir,
  generateLite,
  generateProxyFunc,
} from './utils';

async function main() {
  generateLite('src/index.ts', 'src/lite.ts');
  await generateProxyFunc();

  remove('dist');
  remove('esm');
  remove('cjs');
  remove('lite/esm');
  remove('lite/cjs');
  remove('lite/types');

  mkdir('build');

  compile('types', {
    include: [],
    files: ['../src/index.ts'],
    compilerOptions: {
      declaration: true,
      declarationMap: true,
      emitDeclarationOnly: true,
    },
  });
  remove('types/core');
  remove('types/extensions');

  compile('lite/types', {
    include: [],
    files: ['../src/lite.ts'],
    compilerOptions: {
      declaration: true,
      declarationMap: true,
      emitDeclarationOnly: true,
    },
  });

  mkdir('lite/types');
  copy('build/lite-types', 'lite/types');
}

main();
