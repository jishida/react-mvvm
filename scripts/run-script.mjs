import { spawn } from 'child_process';

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

async function run(name) {
  return new Promise((resolve) => {
    const node = spawn(npx, [
      'ts-node',
      '-P',
      'scripts/tsconfig.json',
      `scripts/${name}.ts`,
      ...process.argv.slice(2),
    ]);
    node.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    node.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    node.on('close', (code) => {
      if (code) {
        throw new Error(`exit code: ${code}`);
      }
      resolve();
    });
  });
}

run(process.argv[2]);
