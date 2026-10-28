(function(){
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  var panels={links:document.getElementById('links'),shop:document.getElementById('shop')};
  var bar=document.querySelector('.tabs');if(!bar)return;
  function show(name,push){
    if(!panels[name]) name='links';
    tabs.forEach(function(t){var on=t.dataset.tab===name;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;});
    Object.keys(panels).forEach(function(k){panels[k].hidden=(k!==name);});
    bar.setAttribute('data-active',name);
    if(push){history.replaceState(null,'',name==='links'?location.pathname:'#'+name);}
  }
  document.addEventListener('click',function(ev){
    var a=ev.target.closest('[data-tab]'); if(!a) return;
    ev.preventDefault(); show(a.dataset.tab,true);
    if(a.classList.contains('feat')) bar.scrollIntoView({behavior:'smooth',block:'start'});
  });
  bar.addEventListener('keydown',function(ev){
    if(ev.key!=='ArrowLeft'&&ev.key!=='ArrowRight') return;
    var cur=bar.getAttribute('data-active')==='shop'?'links':'shop';
    show(cur,true); document.getElementById('tab-'+cur).focus();
  });
  window.addEventListener('hashchange',function(){show(location.hash.slice(1),false);});
  show(location.hash.slice(1),false);
})();
