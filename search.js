const search=document.querySelector('#search');
const rows=[...document.querySelectorAll('.catalog li')];
const sort=document.querySelector('#sort'),catalog=document.querySelector('.catalog');
const narrow=matchMedia('(max-width:760px)'),menu=document.querySelector('#category-menu');
menu.open=!narrow.matches;narrow.addEventListener('change',event=>{menu.open=!event.matches});
let category='전체',area='전체';
for(const group of document.querySelectorAll('[data-filter]'))for(const button of group.querySelectorAll('button'))button.onclick=()=>{if(group.dataset.filter==='area'){area=button.textContent;category='전체';for(const b of document.querySelectorAll('[data-filter="category"] button'))b.setAttribute('aria-pressed',String(b.textContent==='전체'));}else category=button.textContent;for(const b of group.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b===button));filter()};
function filter(){const term=search.value.trim().toLocaleLowerCase();let count=0;
rows.sort((a,b)=>sort.value==='title'?(a.dataset.title.localeCompare(b.dataset.title,'ko')||Number(a.dataset.order)-Number(b.dataset.order)):sort.value==='oldest'?Number(a.dataset.order)-Number(b.dataset.order):Number(b.dataset.order)-Number(a.dataset.order));
for(const row of rows)catalog.appendChild(row);
for(const button of document.querySelectorAll('[data-filter="category"] button')){button.hidden=button.textContent!=='전체'&&!rows.some(row=>(area==='전체'||row.dataset.area===area)&&row.dataset.category===button.textContent);}
for(const row of rows){row.hidden=!(area==='전체'||row.dataset.area===area)||!(category==='전체'||row.dataset.category===category)||!row.textContent.toLocaleLowerCase().includes(term);if(!row.hidden)count++;}
document.querySelector('#count').textContent=count?count+'개의 글':'조건에 맞는 글이 없습니다. 검색어나 분류를 바꿔보세요.';}
search.addEventListener('input',filter);sort.addEventListener('change',filter);filter();
