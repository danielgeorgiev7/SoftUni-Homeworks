import {html,render} from './node_modules/lit-html/lit-html.js'
function app(){
let loadBtn = document.querySelector('#btnLoadTowns');
let inputElem = document.querySelector('#towns');
loadBtn.addEventListener('click',onLoad);
let div = document.querySelector('#root');
let ul = document.createElement('ul');
div.appendChild(ul);

function onLoad(e){
    e.preventDefault();
let input = inputElem.value;
input = input.split(', ');
input.forEach((el)=>{
let li = document.createElement('li');
li.textContent = el;
ul.appendChild(li);
})
}
}
app();