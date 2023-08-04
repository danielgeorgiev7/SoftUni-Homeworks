import { onLoad } from './onLoad.js';
export async function onAdd(e) {
    e.preventDefault();
    let addForm = document.querySelector('#add-form');
    let titleField = addForm.querySelector('[name="title"]');
    let authorField = addForm.querySelector('[name="author"]');

    if (Boolean(titleField.value) && Boolean(authorField.value)) {
        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: titleField.value, author: authorField.value }),
        });
        titleField.value = '';
        authorField.value = '';
        onLoad();
    }
}