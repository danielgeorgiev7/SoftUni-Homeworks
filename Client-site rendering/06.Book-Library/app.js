import {render,html} from './node_modules/lit-html/lit-html.js'
import {onLoad} from './onLoad.js'
import {onAdd} from './onAdd.js'
import {onDelete} from './onDelete.js'
import {onEdit} from './onEdit.js'
import { hideElems } from './onLoad.js'

function app(){

let loadBtn = document.querySelector('#loadBooks');
loadBtn.addEventListener('click',onLoad);
window.addEventListener('load',hideElems);

let addBtn = document.querySelector('[type="submit"]');
addBtn.addEventListener('click',onAdd);

}
app();