import path from 'path';
import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
import main from './package.json';
import lite from './lite/package.json';

const name = 'ReactMVVM';

lite.source = 'src/lite.ts';
lite.name = `${main.name}/lite`;
lite.version = main.version;
lite.year = main.year;
lite.author = main.author;
lite.license = main.license;
lite.unpkg = 'dist/react-mvvm-lite.min.js';
lite.main = `lite/${lite.main}`;
lite.module = `lite/${lite.module}`;

function createBanner(libName, pkg, min) {
  return min
    ? `/**
 * ${libName}
 * @version ${pkg.version}
 * @copyright ${pkg.author} ${pkg.year}
 * @license ${pkg.license}
 **/`
    : `/*
  ${libName} ${pkg.version}

  Copyright (c) ${pkg.year} ${pkg.author}

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
  limitations under the License.
*/`;
}

function createOutputs(pkg) {
  const browserOutput = [
    {
      file: pkg.unpkg.replace(/\.min\.js$/, '.js'),
      banner: createBanner(pkg.name, pkg, false),
    },
    {
      file: pkg.unpkg,
      plugins: [
        terser({
          mangle: {
            toplevel: false,
            properties: {
              regex: '^_[^_]',
            },
          },
        }),
      ],
      banner: createBanner(path.basename(pkg.unpkg), pkg, true),
    },
  ];
  browserOutput.forEach((o) => {
    Object.assign(o, {
      name,
      format: 'iife',
      sourcemap: true,
      globals: {
        react: 'React',
      },
    });
  });

  const moduleOutput = [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ].map((o) => {
    const output = {
      plugins: [],
      sourcemap: true,
      banner: createBanner(pkg.name, pkg, true),
      ...o,
    };
    output.plugins.push(
      terser({
        mangle: {
          properties: {
            regex: '^_[^_]',
          },
        },
      })
    );
    return output;
  });
  return [browserOutput, moduleOutput];
}

export default [main, lite].reduce(
  (list, pkg) =>
    list.concat(
      createOutputs(pkg).map((output) => ({
        input: pkg.source,
        output,
        plugins: [typescript(), buble({ ie: 11 }), bundleSize()],
        external: ['react'],
      }))
    ),
  []
);
