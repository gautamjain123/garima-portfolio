// `npm start`: the local api/ functions (scripts/dev-api.mjs) plus the Angular dev server,
// which proxies /api/* to them. Ctrl+C stops both.
import { spawn } from 'node:child_process';

const run = (cmd) => spawn(cmd, { stdio: 'inherit', shell: true });
const api = run('node scripts/dev-api.mjs');
const ng = run('ng serve');

const stop = () => { api.kill(); ng.kill(); process.exit(); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
ng.on('exit', stop);
