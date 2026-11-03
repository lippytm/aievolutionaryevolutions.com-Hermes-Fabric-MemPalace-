import http from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {randomBytes,timingSafeEqual,createHash,randomUUID} from 'node:crypto';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Vault,ROOT,PROVIDERS,guard,assertNoSecrets} from './core.mjs';

export async function createManager({directory=path.resolve(ROOT,'../../work/jarvis-private'),envFile=null,fetcher=fetch,token=randomBytes(32).toString('hex')}={}){
  const vault=await new Vault(directory,{envFile,fetcher}).init();
  const registry=JSON.parse(await readFile(path.join(ROOT,'agents.json'),'utf8'));
  let origin,unlockAttempts=[],lastTouch=Date.now();
  const assets={'/':['index.html','text/html; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8'],'/style.css':['style.css','text/css; charset=utf-8']};
  const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"};
  const json=(res,code,data)=>{res.writeHead(code,{...headers,'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
  async function body(req){let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>20000)throw new Error('Request too large');chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}');}
  const server=http.createServer(async(req,res)=>{
    try{
      if(req.headers.host!==new URL(origin).host)return json(res,403,{error:'Unrecognized host'});
      if(req.headers.origin&&req.headers.origin!==origin)return json(res,403,{error:'Cross-site request blocked'});
      const url=new URL(req.url,origin);
      if(req.method==='GET'&&Object.hasOwn(assets,url.pathname)){const [file,type]=assets[url.pathname];res.writeHead(200,{...headers,'Content-Type':type});return res.end(await readFile(path.join(ROOT,file)));}
      if(!url.pathname.startsWith('/api/'))return json(res,404,{error:'Not found'});
      const supplied=Buffer.from((req.headers.authorization??'').replace(/^Bearer /,''));const expected=Buffer.from(token);
      if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected))return json(res,401,{error:'Open this manager with Start Jarvis to authorize your browser.'});
      lastTouch=Date.now();
      if(req.method==='GET'&&url.pathname==='/api/state')return json(res,200,{entries:await vault.list(),providers:PROVIDERS,unlocked:!!vault.key,vault_initialized:!!vault.state.verifier,audit:vault.state.audit.slice(-30).reverse(),agents:registry.brains.map(a=>({...a,runtime_status:'profile_only',credential_scope:a.scope})),source:{repository:'lippytm/aievolutionaryevolutions.com-Hermes-Fabric-MemPalace-',revision:'30b5c645e7610616bd4679f3f562a5709c707621'},limits:{deployment:'local_only',cloud_sync:'manual_bundle',key_revocation:'provider_dashboard_required'}});
      if(req.method!=='POST')return json(res,405,{error:'Method not supported'});
      guard(req.headers['content-type']?.split(';')[0]==='application/json','Use JSON requests');
      const data=await body(req);let result;
      if(url.pathname==='/api/unlock'){unlockAttempts=unlockAttempts.filter(t=>Date.now()-t<60000);guard(unlockAttempts.length<5,'Wait one minute before another unlock attempt');unlockAttempts.push(Date.now());result=await vault.unlock(data.passphrase);}
      else if(url.pathname==='/api/lock')result=await vault.lock();
      else if(url.pathname==='/api/keys')result=await vault.add(data);
      else if(url.pathname==='/api/rotate')result=await vault.rotate(data.id,data);
      else if(url.pathname==='/api/status')result=await vault.status(data.id,data.status,data.version);
      else if(url.pathname==='/api/check')result=await vault.check(data.id);
      else if(url.pathname==='/api/export'){
        result=await vault.transact(async()=>{
          const connections=await vault.exportConnections();
          const agents=registry.brains.filter(a=>a.scope==='platform').map(a=>({...a,runtime_status:'profile_only',credential_ref:'workspace-openai',live_execution:false}));
          const artifacts=[{path:'connections.json',content:JSON.stringify(connections,null,2)+'\n'},{path:'agent-profiles.json',content:JSON.stringify({schema_version:'jarvis.agents.v1',agents},null,2)+'\n'}];
          const files=artifacts.map(a=>({path:a.path,bytes:Buffer.byteLength(a.content),sha256:createHash('sha256').update(a.content).digest('hex')}));
          const bundle_id='AIEE-KEY-MANAGER-'+randomUUID(),created_at=new Date().toISOString();
          const packets=['github','chatgpt_business','codex'].map(destination=>({schema_version:'0.1.0',bundle_id,created_at,project:'AI Evolutionary Evolutions',sender:'Charles Earl Lipshay',destination,classification:'internal',files,approval:{required:true,approver:'Charles Earl Lipshay',status:'pending'},receipt_status:'not_sent'}));
          const bundle={schema_version:'jarvis.sync-bundle.v1',bundle_id,created_at,artifacts,packets,instructions:'Import only into the intended project/workspace. Return the exact bundle ID and file hashes for reconciliation. Profiles do not run agents. Private profiles and keys are excluded.'};
          assertNoSecrets(bundle);vault.log('metadata_bundle_exported',bundle_id);return bundle;
        });
      }else return json(res,404,{error:'Not found'});
      return json(res,200,result);
    }catch(e){const allowed=['Invalid','Unknown','Enter','Use ','Key ','Unlock','This key','Workspace','Approved','Automatic','Incorrect','Wait ','A possible','Request too large'];const message=String(e.message??'');const safe=allowed.some(p=>message.startsWith(p))?message:'Operation failed safely; no key values were logged';return json(res,400,{error:safe});}
  });
  server.requestTimeout=15000;server.headersTimeout=10000;
  const timer=setInterval(()=>{if(vault.key&&Date.now()-lastTouch>15*60000)vault.lock().catch(()=>{});},30000);timer.unref();
  server.on('close',()=>{clearInterval(timer);vault.key?.fill(0);vault.key=null;});
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  origin='http://127.0.0.1:'+server.address().port;
  return {server,vault,origin,token,url:origin+'/#access='+token};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const directory=path.resolve(process.env.JARVIS_DATA_DIR||path.resolve(ROOT,'../../work/jarvis-private'));
  const envFile=process.env.JARVIS_ENV_FILE?path.resolve(process.env.JARVIS_ENV_FILE):null;
  const app=await createManager({directory,envFile});
  await mkdir(directory,{recursive:true});
  await writeFile(path.join(directory,'session.json'),JSON.stringify({pid:process.pid,url:app.url,origin:app.origin}),{mode:0o600});
  console.log('Jarvis manager ready at '+app.origin+' (use Start Jarvis for authorized access)');
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>app.server.close(()=>process.exit(0)));
}
