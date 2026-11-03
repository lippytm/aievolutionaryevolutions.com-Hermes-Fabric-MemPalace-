import {spawn} from 'node:child_process';
import {readFile,mkdir,open,access} from 'node:fs/promises';
import path from 'node:path';
import {ROOT} from './core.mjs';
const directory=process.env.JARVIS_DATA_DIR||path.resolve(ROOT,'../../work/jarvis-private');
await mkdir(directory,{recursive:true});
const envFile=process.env.JARVIS_ENV_FILE||path.resolve(ROOT,'../../.env.local');
let envExists=false;try{await access(envFile);envExists=true;}catch{}
async function session(){try{const s=JSON.parse(await readFile(path.join(directory,'session.json'),'utf8'));if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(s.origin)||!s.url.startsWith(s.origin+'/#access='))return null;const token=new URL(s.url).hash.slice('#access='.length);const r=await fetch(s.origin+'/api/state',{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(1000)});return r.ok?s:null;}catch{return null;}}
let current=await session();
if(!current){const logfile=await open(path.join(directory,'server.log'),'a');const child=spawn(process.execPath,[path.join(ROOT,'server.mjs')],{cwd:ROOT,env:{...process.env,JARVIS_DATA_DIR:directory,...(envExists?{JARVIS_ENV_FILE:envFile}:{})},detached:true,windowsHide:true,stdio:['ignore',logfile.fd,logfile.fd]});child.unref();await logfile.close();for(let i=0;i<40;i++){await new Promise(r=>setTimeout(r,250));current=await session();if(current)break;}}
if(!current)throw new Error('Jarvis did not start. See the local server.log file.');
if(process.platform==='win32'){const browser=spawn('powershell.exe',['-NoProfile','-NonInteractive','-Command','$jarvisUrl = [Console]::In.ReadToEnd(); Start-Process -FilePath $jarvisUrl'],{windowsHide:true,stdio:['pipe','ignore','ignore']});browser.stdin.end(current.url);}
else console.log('Use session.json in your private data directory to open the authorized local URL.');
console.log('Jarvis API Connections is running locally.');
