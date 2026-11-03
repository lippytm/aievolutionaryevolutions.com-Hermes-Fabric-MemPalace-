import {open,mkdir,unlink,readFile} from 'node:fs/promises';
import {readFileSync,unlinkSync} from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
const owned=new Map();
process.once('exit',()=>{for(const [file,token] of owned){try{if(JSON.parse(readFileSync(file,'utf8')).token===token)unlinkSync(file);}catch{}}});
// Stale or unreadable locks fail closed; a writer's lock is never stolen.
export async function acquireLock(directory,name){
  await mkdir(directory,{recursive:true});const file=path.join(directory,name),token=randomUUID();let handle;
  try{handle=await open(file,'wx',0o600);}catch(e){if(e.code==='EEXIST')throw new Error('Manager storage is already owned or a stale lock needs review: '+name);throw e;}
  try{await handle.writeFile(JSON.stringify({pid:process.pid,token,created_at:new Date().toISOString()}));}catch(e){await handle.close();await unlink(file).catch(()=>{});throw e;}
  await handle.close();owned.set(file,token);let released=false;
  return async()=>{if(released)return;released=true;try{const owner=JSON.parse(await readFile(file,'utf8'));if(owner.token===token)await unlink(file);}finally{owned.delete(file);}};
}
