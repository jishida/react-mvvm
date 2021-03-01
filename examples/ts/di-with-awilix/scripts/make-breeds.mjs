import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const apiDir = resolve('public/api');

const animalsFile = resolve(apiDir, 'animals.json');
const animalsText = readFileSync(animalsFile, 'utf8');
const animals = JSON.parse(animalsText);

animals.forEach((animal) => {
  const srcFile = resolve(apiDir, 'breeds', `${animal}.txt`);
  const destFile = resolve(apiDir, 'breeds', `${animal}.json`);
  const breedsText = readFileSync(srcFile, 'utf8');
  const breedsLines = breedsText.split('\n').filter((s) => !!s);
  const keys = breedsLines
    .shift()
    .split('|')
    .map((s) => s.trim());
  const breeds = breedsLines.map((line) => {
    const values = line.split('|').map((s) => s.trim());
    return keys.reduce((breed, key, i) => {
      breed[key] = values[i];
      return breed;
    }, {});
  });
  const breedsJson = JSON.stringify(breeds, undefined, 2);
  writeFileSync(destFile, breedsJson, 'utf8');
});
