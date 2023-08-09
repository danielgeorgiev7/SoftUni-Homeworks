import page from 'page/page.mjs';
import {html,render} from 'lit-html/lit-html.js'

import { dashboardView } from './dashboard.js';
import { detailsView } from './details.js';
export async function editView(ctx) {
    let id = ctx.params.id;

    let response = await fetch(`http://localhost:3030/data/memes/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
    });

    if (response.ok) {
        let data = await response.json();
        let editTemplate = `
        <section id="edit-meme">
    <form id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`  // TEMPLATE HERE 
        document.querySelector('main').innerHTML = editTemplate;

        let title = document.querySelector('#title');
        let description = document.querySelector('#description');
        let imageUrl = document.querySelector('#imageUrl');

        title.value = data.title;
        description.value = data.description;
        imageUrl.value = data.imageUrl;

        document.querySelector('.button').addEventListener('click', onEdit);

        async function onEdit(e) {
            e.preventDefault();
            if (title.value !=='' && description.value !== '' && imageUrl !== '') { // ELEMENTS HERE
                {

                    let response = await fetch(`http://localhost:3030/data/memes/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
                        body: JSON.stringify({title: title.value, description: description.value, imageUrl: imageUrl.value}),

                    });

                    if (response.ok) {
                        detailsView(ctx);
                        page.redirect(`/details/${id}`);
                    }
                }
            }
            else {
                let notification = document.querySelector('.notification');
                let span = document.querySelector('.notification span');
                span.textContent = 'Please fill all fields';
                setTimeout(() => {notification.style.display = 'block'},1);
                setTimeout(() => {notification.style.display = 'none'},6000);

            }
        }
    }
}


// <!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
// <section id="edit-meme">
//     <form id="edit-form">
//         <h1>Edit Meme</h1>
//         <div class="container">
//             <label for="title">Title</label>
//             <input id="title" type="text" placeholder="Enter Title" name="title">
//             <label for="description">Description</label>
//             <textarea id="description" placeholder="Enter Description" name="description">
//                     Programming is often touted as a smart and lucrative career path.
//                     It's a job that (sometimes) offers flexibility and great benefits.
//                     But it's far from sunshine and Nyan Cat rainbows. The hours are long.
//                     The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
//                     These memes cover most of the frustration (and funny moments) of programming.
//                     At least we can laugh through the pain. 
//                 </textarea>
//             <label for="imageUrl">Image Url</label>
//             <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
//             <input type="submit" class="registerbtn button" value="Edit Meme">
//         </div>
//     </form>
// </section>