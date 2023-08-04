import { onLoad } from "./onLoad.js";

export function onEdit(e) {
    e.preventDefault();
    let addForm = document.querySelector('#add-form');
    let editForm = document.querySelector('#edit-form');
    editForm.style.display = '';
    addForm.style.display = 'none';
    
    let tr = e.target.parentElement.parentElement;
    let saveBtn = editForm.querySelector('[type="submit"]');
    let titleField = editForm.querySelector('[name="title"]');
    let authorField = editForm.querySelector('[name="author"]');
    titleField.value = tr.querySelector('#title-td').textContent
    authorField.value = tr.querySelector('#author-td').textContent

    saveBtn.addEventListener('click',onSave);
    async function onSave(e){
        e.preventDefault()
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${tr.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title:titleField.value, author: authorField.value})
    });
    if(response.ok){
    titleField.value = '';
    authorField.value = '';
    onLoad();
    }
}
}