import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { toDashboard } from './dashboard.js';
export async function toDetails(ctx) {
    let id = ctx.params.id;

    let response = await fetch(`http://localhost:3030/data/fruits/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data.imageUrl);
        if(data.imageUrl === '/images/fruit 1.png' || data.imageUrl === '/images/fruit 2.png' || data.imageUrl === '/images/fruit 3.png'){
            data.imageUrl = data.imageUrl.split(' ').join('');
            }
        let detailsTemplate = (data) => `<section id="details"><div id="details-wrapper"><img id="details-img" src=${data.imageUrl} alt="example1" /><p id="details-title">${data.name}</p><div id="info-wrapper"><div id="details-description"><p>${data.description}</p><p id="nutrition">Nutrition</p><p id = "details-nutrition">${data.nutrition}</p></div><div id="action-buttons"><a href="/edit/${data._id}" id="edit-btn">Edit</a><a id="delete-btn">Delete</a></div></div></div></section>`;

        document.querySelector('main').innerHTML = detailsTemplate(data);
        let deleteBtn = document.querySelector('#delete-btn');
        let editBtn = document.querySelector('#edit-btn');
        if (data._ownerId !== sessionStorage.id) {
            deleteBtn.remove();
            editBtn.remove();
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', onDelete);
            async function onDelete(e) {
                e.preventDefault();
                let response = await fetch(`http://localhost:3030/data/fruits/${id}`, {
                    method: 'DELETE',
                    headers: {'X-Authorization': sessionStorage.accessToken },
                });
                if (response.ok) {

                }
            }
        }
    }
}