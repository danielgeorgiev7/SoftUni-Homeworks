import { towns } from './towns.js'
import { html, render} from './node_modules/lit-html/lit-html.js'
function search() {
let template = (towns) => html`<ul>
<li>${towns[0]}</li>
<li>${towns[1]}</li>
<li>${towns[2]}</li>
<li>${towns[3]}</li>
<li>${towns[4]}</li>
<li>${towns[5]}</li>
</ul>`;
let div = document.querySelector('#towns');
render(template(towns),div)

let searchBtn = document.querySelector('button');
searchBtn.addEventListener('click',onSearch);

function onSearch(e){
e.preventDefault();
let matchesFound = 0;
let searchText = document.querySelector('#searchText');
let lis = document.querySelector('#towns ul').children;
Array.from(lis).forEach((el)=>{
if(el.textContent.includes(searchText.value)){
el.classList = 'active';
matchesFound++;
}
else {
el.classList = '';
}
})
let result = document.querySelector('#result');
result.textContent = `${matchesFound} matches found`
}

}
search();