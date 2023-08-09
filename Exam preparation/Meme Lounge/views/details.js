import page from 'page/page.mjs';
import {html,render} from 'lit-html/lit-html.js'

import { dashboardView } from './dashboard.js';
export async function detailsView(ctx) {
    let id = ctx.params.id;

    let response = await fetch(`http://localhost:3030/data/memes/${id}`, {    // URL HERE
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
    });

    if (response.ok) {
        let data = await response.json();
        let detailsTemplate = (data) => `<section id="meme-details"><h1>Meme Title: ${data.title}</h1><div class="meme-details"><div class="meme-img"><img alt="meme-alt" src=${data.imageUrl}></div><div class="meme-description"><h2>Meme Description</h2><p>${data.description}</p><a class="button warning" id="edit-btn" href="/edit/${data._id}">Edit</a><button id="delete-btn" class="button danger">Delete</button></div></div></section>`; // TEMPLATE HERE

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
                let response = await fetch(`http://localhost:3030/data/memes/${id}`, {   // URL HERE
                    method: 'DELETE',
                    headers: {'X-Authorization': sessionStorage.accessToken },
                });
                if (response.ok) {
                dashboardView();
                }
            }
        }
    }
}

// <!-- Details Meme Page (for guests and logged users) -->
// <section id="meme-details">
//     <h1>Meme Title: Bad code can present some problems

//     </h1>
//     <div class="meme-details">
//         <div class="meme-img">
//             <img alt="meme-alt" src="/images/3.png">
//         </div>
//         <div class="meme-description">
//             <h2>Meme Description</h2>
//             <p>
//                 Being a programmer is a fun job. And many funny incidents occur throughout a
//                 programmer’s career.
//                 Here are a few jokes that can be relatable to you as a programmer.
//             </p>

//             <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
//             <a class="button warning" href="#">Edit</a>
//             <button class="button danger">Delete</button>
            
//         </div>
//     </div>
// </section>