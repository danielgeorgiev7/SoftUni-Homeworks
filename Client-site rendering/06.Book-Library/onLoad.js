import { render, html } from './node_modules/lit-html/lit-html.js'
import { onDelete } from './onDelete.js'
import { onEdit } from './onEdit.js'

export async function hideElems(){
    let addForm = document.querySelector('#add-form');
    let editForm = document.querySelector('#edit-form');
    editForm.style.display = 'none';
    addForm.style.display = '';
}
export async function onLoad() {
    hideElems();
    let htmlStore = [];
    let template = (id, el) => htmlStore.push(html`
<tr id=${id}>
<td id="title-td" .textContent = ${el.title}></td>
<td id="author-td" .textContent = ${el.author}></td>
<td>
    <button id="edit-btn">Edit</button>
    <button id="delete-btn">Delete</button>
</td>
</tr>
`);
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');
    let data = await response.json();
    Object.entries(data).forEach(([id, el]) => template(id, el));
    render(htmlStore, document.querySelector('tbody'));

    let deleteBtns = document.querySelectorAll('#delete-btn');
    let editBtns = document.querySelectorAll('#edit-btn');
    deleteBtns.forEach((el) => el.addEventListener('click', onDelete));
    editBtns.forEach((el) => el.addEventListener('click', onEdit));

}