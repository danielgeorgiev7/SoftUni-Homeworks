import {html, render} from './node_modules/lit-html/lit-html.js';
import {cats} from './catSeeder.js'
function app(){
let allCats = document.querySelector('#allCats');
allCats.appendChild(document.createElement('ul'));
let htmlStorage = [];
let template = (cat) => htmlStorage.push(html`
<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn">Show status code</button>
    <div class="status" style="display: none" id=${cat.statusCode}>
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>
`);
cats.forEach((cat)=> template(cat));
console.log(cats)
render(htmlStorage, document.querySelector('#allCats ul'))
console.log(htmlStorage)

let buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach((button)=> button.addEventListener('click',onClick));
function onClick(e){
let current = e.target;
let parent = e.target.parentElement;
let statusElem = parent.querySelector('.status');
if(current.textContent ==='Show status code'){
statusElem.style.display = '';
current.textContent = 'Hide status code'
}
else {
    statusElem.style.display = 'none';
    current.textContent = 'Show status code'
}

}
}
app();