import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {Vault} from '../core.mjs';
import {launch,resolvePaths} from '../launch.mjs';

test('a second process cannot open or overwrite an owned vault',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'jarvis-writer-'));
 const v=await new Vault(dir).init();await v.unlock('synthetic-test-passphrase');
 await v.add({provider:'openai',label:'Preserve me',scope:'platform',secret:'synthetic-key-for-test-12345'});
 const before=await readFile(v.file,'utf8');
 const module=new URL('../core.mjs',import.meta.url).href;
 const child=spawnSync(process.execPath,['--input-type=module','-e',`import {Vault} from ${JSON.stringify(module)};try{await new Vault(${JSON.stringify(dir)}).init();process.exit(2);}catch(e){if(!e.message.startsWith('Manager storage is already owned'))throw e;console.log('second writer blocked');}`],{encoding:'utf8',timeout:10000,windowsHide:true});
 assert.equal(child.status,0,child.stderr);assert.match(child.stdout,/second writer blocked/);assert.equal(await readFile(v.file,'utf8'),before);
 await v.close();const reopened=await new Vault(dir).init();await reopened.unlock('synthetic-test-passphrase');assert.equal((await reopened.list())[0].label,'Preserve me');await reopened.close();
});
test('relative overrides are resolved against the caller before starting the server',()=>{
 const cwd=path.resolve('work','caller');const paths=resolvePaths({JARVIS_DATA_DIR:'runtime',JARVIS_ENV_FILE:'keys/openai.env'},cwd);
 assert.equal(paths.directory,path.join(cwd,'runtime'));assert.equal(paths.envFile,path.join(cwd,'keys','openai.env'));assert(path.isAbsolute(paths.directory));assert(path.isAbsolute(paths.envFile));
});
test('simultaneous launches share one server and read the exact relative env file',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'jarvis-launch-'));await writeFile(path.join(dir,'approved.env'),'OPENAI_API_KEY=synthetic-startup-test-key\n');
 const options={cwd:dir,openBrowser:false,env:{...process.env,JARVIS_DATA_DIR:'runtime',JARVIS_ENV_FILE:'approved.env'}};let live;
 try{const [a,b]=await Promise.all([launch(options),launch(options)]);live=a;assert.equal(a.pid,b.pid);assert.equal(a.origin,b.origin);const token=new URL(a.url).hash.slice('#access='.length);const headers={Authorization:'Bearer '+token};const state=await (await fetch(a.origin+'/api/state',{headers})).json();assert(state.entries.some(e=>e.id==='workspace-openai'));const disk=JSON.parse(await readFile(path.join(dir,'runtime','session.json'),'utf8'));assert.equal(disk.pid,a.pid);}
 finally{if(live){const token=new URL(live.url).hash.slice('#access='.length);await fetch(live.origin+'/api/shutdown',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:'{}'});for(let i=0;i<40;i++){try{await access(path.join(dir,'runtime','vault.writer.lock'));}catch{return;}await new Promise(r=>setTimeout(r,50));}assert.fail('Server did not release its vault lock');}}
});
