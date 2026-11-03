import {spawn} from 'node:child_process';
import {readFile,mkdir,open,access} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ROOT} from './core.mjs';
import {acquireLock} from './locking.mjs';
export function resolvePaths(env=process.env,cwd=process.cwd()){
 return {directory:path.resolve(cwd,env.JARVIS_DATA_DIR||path.resolve(ROOT,'../../work/jarvis-private')),envFile:path.resolve(cwd,env.JARVIS_ENV_FILE||path.resolve(ROOT,'../../.env.local'))};
}
export async function launch({env=process.env,cwd=process.cwd(),openBrowser=true}={}){
 const {directory,envFile}=resolvePaths(env,cwd);await mkdir(directory,{recursive:true});
 let envExists=false;try{await access(envFile);envExists=true;}catch{}
 async function session(){try{const s=JSON.parse(await readFile(path.join(directory,'session.json'),'utf8'));if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(s.origin)||!s.url.startsWith(s.origin+'/#access='))return null;const token=new URL(s.url).hash.slice('#access='.length);const r=await fetch(s.origin+'/api/state',{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(1000)});return r.ok?s:null;}catch{return null;}}
 let current=await session();
 if(!current){
  let release;
  for(let i=0;i<40;i++){try{release=await acquireLock(directory,'launcher.startup.lock');break;}catch(e){if(!e.message.startsWith('Manager storage is already owned'))throw e;await new Promise(r=>setTimeout(r,250));}}
  if(!release)throw new Error('Another launcher is starting. Retry after it finishes; review stale locks if startup was interrupted.');
  try{
   current=await session();
   if(!current){
    const logfile=await open(path.join(directory,'server.log'),'a');
    const child=spawn(process.execPath,[path.join(ROOT,'server.mjs')],{cwd:ROOT,env:{...env,JARVIS_DATA_DIR:directory,JARVIS_ENV_FILE:envExists?envFile:''},detached:true,windowsHide:true,stdio:['ignore',logfile.fd,logfile.fd]});
    await new Promise((resolve,reject)=>{child.once('spawn',resolve);child.once('error',reject);}).finally(()=>logfile.close());
    child.unref();
    for(let i=0;i<40;i++){await new Promise(r=>setTimeout(r,250));current=await session();if(current)break;}
   }
  }finally{await release();}
 }
 if(!current)throw new Error('Jarvis did not start. See server.log in the private data directory.');
 if(openBrowser&&process.platform==='win32'){const browser=spawn('powershell.exe',['-NoProfile','-NonInteractive','-Command','$jarvisUrl = [Console]::In.ReadToEnd(); Start-Process -FilePath $jarvisUrl'],{windowsHide:true,stdio:['pipe','ignore','ignore']});browser.stdin.on('error',()=>{});browser.stdin.end(current.url);}
 return current;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){await launch();console.log('Jarvis API Connections is running locally.');}
