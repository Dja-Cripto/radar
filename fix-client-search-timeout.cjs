const fs=require('fs');let s=fs.readFileSync('server.mjs','utf8');const marker='async function leadsApi(req,res,url){';s=s.replace(marker,`const clientSearchRuns=new Map();
function beginClientSearch(c){
  if(clientSearchRuns.has(c.id))return clientSearchRuns.get(c.id);
  c.searchJob={status:'running',startedAt:new Date().toISOString()};
  const run=(async()=>{
    try{
      await persistState();
      const stats=await searchCampaign(c,{http:httpTools,keys:state.integrations,state,jobCatalog:jobCatalogForSignals(),sender:senderInfo()});
      c.searchJob={...c.searchJob,status:'done',stats,finishedAt:new Date().toISOString()};
    }catch(e){c.searchJob={...c.searchJob,status:'failed',error:e.message,finishedAt:new Date().toISOString()};}
    finally{clientSearchRuns.delete(c.id);await persistState();}
  })();
  clientSearchRuns.set(c.id,run);return run;
}
`+marker);
const a=s.indexOf("    if(parts[3]==='search'&&req.method==='POST'){");const b=s.indexOf("    if(parts[3]==='regenerate'",a);if(a<0||b<0)throw Error('search block');s=s.slice(0,a)+`    if(parts[3]==='search-status'&&req.method==='GET')return reply(res,200,c.searchJob||{status:'idle'});
    if(parts[3]==='search'&&req.method==='POST'){
      beginClientSearch(c).catch(e=>console.error('Busca de clientes:',e.message));
      return reply(res,202,{status:'running'});
    }
`+s.slice(b);
s=s.replace('try{await searchCampaign(c,{http:httpTools,keys:state.integrations,state,jobCatalog:jobCatalogForSignals(),sender:senderInfo()});}', 'try{await beginClientSearch(c);}');
fs.writeFileSync('server.mjs',s);
let u=fs.readFileSync('leads-ui.js','utf8');u=u.replace('    const r=await api(`/api/campaigns/${encodeURIComponent(c.id)}/search`,{method:"POST"});','    await api(`/api/campaigns/${encodeURIComponent(c.id)}/search`,{method:"POST"});\n    let r;\n    do{await new Promise(resolve=>setTimeout(resolve,2500));r=await api(`/api/campaigns/${encodeURIComponent(c.id)}/search-status`);if(r.status==="running")setLeadStatus("Busca em andamento no servidor. Conferindo empresas e e-mails; aguarde…");}while(r.status==="running");\n    if(r.status==="failed")throw Error(r.error||"Não foi possível concluir a busca.");');
fs.writeFileSync('leads-ui.js',u);
