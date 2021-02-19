import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { load } from 'js-yaml';
import { render } from 'ejs';
import exec from './exec';
import { npx } from './constants';

type OptionKey =
  | 'ref'
  | 'result'
  | 'value'
  | 'observable'
  | 'validatable'
  | 'async';
interface YamlEntry {
  include: OptionKey[];
  exclude: OptionKey[][];
}
interface TemplateEntry {
  filter: string;
  includeClass: string;
  excludeClass: string;
}

function getFilter(include: OptionKey[], exclude: OptionKey[]) {
  const options: string[] = [];
  if (include.length) {
    options.push(
      `Mandatory<${include.map((key) => `'${key}'`).join(' | ')}, true>`
    );
  }
  if (exclude.length) {
    options.push(
      `Mandatory<${exclude.map((key) => `'${key}'`).join(' | ')}, false>`
    );
  }
  if (!options.length) {
    return '{}';
  }
  return options.join(' & ');
}

function getIncludeClass(include: OptionKey[]) {
  const classes: string[] = [];
  if (include.includes('async')) {
    classes.push('Validatable<any, true>');
  } else if (include.includes('validatable')) {
    classes.push('Validatable<any, any>');
  } else if (include.includes('observable')) {
    classes.push('Observable<any>');
  } else if (include.includes('value')) {
    classes.push('DependencyValue<any>');
  }
  if (include.includes('ref')) {
    classes.push('Ref<any>');
  }
  if (include.includes('result')) {
    classes.push('Result<any>');
  }
  if (!classes.length) {
    classes.push('ViewModelObject');
  }
  return classes.join(' & ');
}

function getExcludeClass(exclude: OptionKey[]) {
  const classes: string[] = [];
  if (exclude.includes('async')) {
    classes.push('Validatable<any, true>');
  } else if (exclude.includes('validatable')) {
    classes.push('Validatable<any, any>');
  } else if (exclude.includes('observable')) {
    classes.push('Observable<any>');
  } else if (exclude.includes('value')) {
    classes.push('DependencyValue<any>');
  }
  if (exclude.includes('ref')) {
    classes.push('Ref<any>');
  }
  if (exclude.includes('result')) {
    classes.push('Result<any>');
  }
  if (!classes.length) {
    classes.push('void');
  }
  return classes.join(' | ');
}

export default async function generateProxyFunc() {
  const yamlFile = resolve('src/proxy-func.yml');
  const yamlText = readFileSync(yamlFile, 'utf8');
  const yaml = load(yamlText) as YamlEntry[];
  const entries: TemplateEntry[] = yaml.flatMap(({ include, exclude }) =>
    exclude.map((_exclude) => {
      return {
        filter: getFilter(include, _exclude),
        includeClass: getIncludeClass(include),
        excludeClass: getExcludeClass(_exclude),
      };
    })
  );
  const templateFile = resolve('src/proxy-func.ejs');
  const templateText = readFileSync(templateFile, 'utf8');
  const text = render(templateText, { entries });
  const outputFile = resolve('src/proxy-func.ts');
  writeFileSync(outputFile, text, 'utf8');
  console.log(`generated: '${outputFile}'`);
  await exec(npx, 'prettier', 'src/proxy-func.ts', '--write');
}
