/* The adventure reader opens inside the existing homepage without changing its layout. */
(() => {
  'use strict';
  let reader, frame, returnFocus;
  function openReader(link) {
    if (!window.HTMLDialogElement || typeof HTMLDialogElement.prototype.showModal !== 'function') { location.href=link.href; return; }
    if (!reader) {
      reader=document.createElement('dialog');reader.className='adventure-portal';reader.setAttribute('aria-labelledby','adventure-portal-title');
      reader.innerHTML='<div class="adventure-portal-bar"><span id="adventure-portal-title">冒险之书 <small>交界地纪行 · 十二章全篇</small></span><div class="adventure-portal-actions"><a href="adventure.html" target="_blank" rel="noopener" aria-label="在新页面阅读冒险之书">独立阅读 ↗</a><button type="button" aria-label="关闭冒险之书">×</button></div></div><iframe title="艾尔登法环互动冒险之书" allow="fullscreen"></iframe>';
      document.body.append(reader);frame=reader.querySelector('iframe');
      reader.querySelector('button').addEventListener('click',()=>reader.close());
      reader.addEventListener('close',()=>{document.documentElement.classList.remove('adventure-reader-open');if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
      reader.addEventListener('click',event=>{if(event.target!==reader)return;const r=reader.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)reader.close();});
      window.addEventListener('message',event=>{if(event.origin===location.origin&&event.source===frame.contentWindow&&event.data?.type==='elden-adventure-close'&&reader.open)reader.close();});
    }
    returnFocus=link;
    if(!frame.getAttribute('src'))frame.src='adventure.html?embed=1';
    if(!reader.open)reader.showModal();
    document.documentElement.classList.add('adventure-reader-open');
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[data-open-adventure]');
    if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();openReader(link);
  });
})();
