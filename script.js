const search = document.getElementById('search');
const category = document.getElementById('category');
const library = document.getElementById('library');
const empty = document.getElementById('empty');
const stats = document.getElementById('stats');

[...new Set(PDFs.map(x => x.category).filter(Boolean))].sort().forEach(c => {
  const o=document.createElement('option'); o.value=c; o.textContent=c; category.appendChild(o);
});

function render(){
  const q=search.value.trim().toLowerCase();
  const cat=category.value;
  const items=PDFs.filter(x => {
    const text=[x.title,x.category,x.subject,x.chapter].join(' ').toLowerCase();
    return (!q || text.includes(q)) && (!cat || x.category===cat);
  });
  stats.textContent=`${items.length} PDF${items.length===1?'':'s'} दिखाई जा रही हैं`;
  library.innerHTML=items.map(x=>{
    const dl=x.downloadUrl || x.url;
    return `<article class="card">
      <h2>📄 ${escapeHtml(x.title)}</h2>
      <div class="meta">${escapeHtml(x.category||'')} ${x.subject?'• '+escapeHtml(x.subject):''} ${x.chapter?'• '+escapeHtml(x.chapter):''}</div>
      <div class="buttons">
        <a class="btn view" href="${attr(x.url)}" target="_blank" rel="noopener">👁️ देखें</a>
        <a class="btn download" href="${attr(dl)}" target="_blank" rel="noopener">⬇️ डाउनलोड</a>
      </div>
    </article>`;
  }).join('');
  empty.hidden=items.length!==0;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function attr(s){return String(s).replace(/"/g,'&quot;');}
search.addEventListener('input',render);
category.addEventListener('change',render);
render();
