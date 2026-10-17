const search=document.querySelector('#search');
const rows=[...document.querySelectorAll('.catalog li')];
let category='전체';
for(const button of document.querySelectorAll('.categories button'))button.onclick=()=>{category=button.textContent;for(const b of document.querySelectorAll('.categories button'))b.setAttribute('aria-pressed',String(b===button));filter()};
function filter(){const term=search.value.trim().toLocaleLowerCase();let count=0;
for(const row of rows){row.hidden=!(category==='전체'||row.dataset.category===category)||!row.textContent.toLocaleLowerCase().includes(term);if(!row.hidden)count++;}
document.querySelector('#count').textContent=count+'개의 글';}
search.addEventListener('input',filter);filter();
