import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk(root);let refs=0,pages=0;
for(const file of files.filter(f=>f.endsWith('.html'))){
 const html=await readFile(file,'utf8');
 assert(html.includes('<title>'),`Missing title: ${file}`);
 for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(ref))continue;
  const [relative,anchor]=ref.split('#');
  let target=relative?path.resolve(path.dirname(file),relative):file;
  assert(target===root||target.startsWith(root+path.sep),`Escapes dist: ${ref}`);
  if((await stat(target)).isDirectory())target=path.join(target,'index.html');
  const text=await readFile(target,'utf8');
  if(anchor)assert(text.includes(`id="${anchor}"`),`Missing anchor ${ref}`);
  refs++;
 }
 if(file.includes('/en/')||file.includes('/zh/')){
  assert(html.includes('class="language"'),'Missing language switch');
  assert(html.includes('<main id="main"'),'Missing main landmark');
  assert(html.includes('mailto:compliance@bgtechsg.global'),'Missing contact');
  pages++;
 }
}
assert.equal(pages,12);
console.log(`Passed: ${pages} bilingual pages, ${refs} local links/assets/anchors, document metadata and navigation.`);
