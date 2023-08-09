import page from 'page/page.mjs';
import {html,render} from 'lit-html/lit-html.js'

import { dashboardView } from './dashboard.js';
export function createView(){
let createTemplate = `<section id="create-meme"><form id="create-form"><div class="container"><h1>Create Meme</h1><label for="title">Title</label><input id="title" type="text" placeholder="Enter Title" name="title"><label for="description">Description</label><textarea id="description" placeholder="Enter Description" name="description"></textarea><label for="imageUrl">Meme Image</label><input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl"><input type="submit" class="registerbtn button" value="Create Meme"></div></form></section>`
document.querySelector('main').innerHTML = createTemplate;

        document.querySelector('.button').addEventListener('click', onCreate);

        async function onCreate(e){
        e.preventDefault();
        let title = document.querySelector('#title').value;
        let description = document.querySelector('#description').value;
        let imageUrl = document.querySelector('#imageUrl').value;


      if(title!== '' && description!== '' && imageUrl!== ''){  
          let response = await fetch('http://localhost:3030/data/memes', {
        method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization' : sessionStorage.accessToken },
                body: JSON.stringify({title,description,imageUrl}),
        });
        if(response.ok){
        dashboardView();
        }}
        else {
          let notification = document.querySelector('.notification');
          let span = document.querySelector('.notification span');
          span.textContent = 'Please fill all fields';
          setTimeout(() => {notification.style.display = 'block'},1);
          setTimeout(() => {notification.style.display = 'none'},6000);

      }
    }
}


// <!-- Create Meme Page ( Only for logged users ) -->
// <section id="create-meme">
//     <form id="create-form">
//         <div class="container">
//             <h1>Create Meme</h1>
//             <label for="title">Title</label>
//             <input id="title" type="text" placeholder="Enter Title" name="title">
//             <label for="description">Description</label>
//             <textarea id="description" placeholder="Enter Description" name="description"></textarea>
//             <label for="imageUrl">Meme Image</label>
//             <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
//             <input type="submit" class="registerbtn button" value="Create Meme">
//         </div>
//     </form>
// </section>