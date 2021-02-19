import { spawn } from 'child_process';

class ProcessError extends Error {
  readonly code: number;

  constructor(code: number) {
    super(`exit code: ${code}`);
    this.code = code;
  }
}

export default async function exec(cmd: string, ...args: string[]) {
  console.log(`execute: ${cmd} ${args.map((arg) => `'${arg}'`).join(' ')}`);
  return new Promise((resolve, reject) => {
    const n = spawn(cmd, args, {});
    n.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    n.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    n.on('close', (code) => {
      if (code) {
        reject(new ProcessError(code));
      } else {
        resolve(undefined);
      }
    });
  });
}
