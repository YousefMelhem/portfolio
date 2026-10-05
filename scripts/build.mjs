import { readFile, access, mkdir, cp } from 'node:fs/promises';
import { resolve } from 'node:path';

// The site remains plain HTML/CSS/JS. Validate local references before packaging.
const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML ids');
for (const [, attribute, destination] of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
  if (!destination) throw new Error(`Empty ${attribute}`);
  if (destination.startsWith('#')) {
    if (!ids.includes(destination.slice(1))) throw new Error(`Missing anchor: ${destination}`);
  } else if (!/^[a-z]+:/i.test(destination)) {
    await access(resolve(root, destination));
  }
}
console.log('Local links, anchors and assets verified.');
if (!process.argv.includes('--check')) {
  const output = resolve(root, 'dist');
  await mkdir(output, { recursive: true });
  for (const path of ['index.html', 'css', 'js', 'images']) {
    await cp(resolve(root, path), resolve(output, path), { recursive: true });
  }
  console.log('Static site built in dist/.');
}
