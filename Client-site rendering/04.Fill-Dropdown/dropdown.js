import { render , html } from './node_modules/lit-html/lit-html.js'
async function load() {
let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
let data = await response.json();
let select = document.querySelector('#menu');
let htmlText = [];
let template = (el) => htmlText.push(html`<option value=${el._id} .textContent=${el.text}></option>`);
Object.values(data).forEach((el)=> template(el));
render(htmlText, select)

let addBtn = document.querySelector('[value="Add"]');
addBtn.addEventListener('click',onAdd);

async function onAdd(e){
    e.preventDefault();
let input = document.querySelector('#itemText');
let response = await fetch ('http://localhost:3030/jsonstore/advanced/dropdown', {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({'text':input.value}),
})
if(response.ok){
let data = await response.json();
template(data);
render(htmlText, select);
input.value = '';
}
}
}
load();
