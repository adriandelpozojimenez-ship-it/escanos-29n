// v2 (3 nov 2026): la página se pide siempre a la red para que las actualizaciones lleguen al momento; sin red, la última guardada.
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate') return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{ const c=r.clone(); caches.open('pozanos').then(x=>x.put(e.request,c)); return r; }).catch(()=>caches.match(e.request)));
});
