import { html, render } from '../node_modules/lit-html/lit-html.js'
import { dashboardView } from './dashboard.js';
export function createView(){
let createTemplate = `<section id="create"><div class="form"><h2>Add Album</h2><form class="create-form"><input type="text" name="singer" id="album-singer" placeholder="Singer/Band" /><input type="text" name="album" id="album-album" placeholder="Album" /><input type="text" name="imageUrl" id="album-img" placeholder="Image url" /><input type="text" name="release" id="album-release" placeholder="Release date" /><input type="text" name="label" id="album-label" placeholder="Label" /><input type="text" name="sales" id="album-sales" placeholder="Sales" /><button type="submit">post</button></form></div></section>`;

document.querySelector('main').innerHTML = createTemplate;

        document.querySelector('button').addEventListener('click', onCreate);

        async function onCreate(e){
        e.preventDefault();
        let singer = document.querySelector('#album-singer').value;
        let album = document.querySelector('#album-album').value;
        let imageUrl = document.querySelector('#album-img').value;
        let release = document.querySelector('#album-release').value;
        let label = document.querySelector('#album-label').value;
        let sales = document.querySelector('#album-sales').value;


      if(singer !== '' && album !== '' && imageUrl !== '' && release !== '' && label !== '' && sales !== ''){  
          let response = await fetch('http://localhost:3030/data/albums', {
        method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization' : sessionStorage.accessToken },
                body: JSON.stringify({singer, album, imageUrl, release, label, sales,_ownerId: sessionStorage.id}),
        });
        if(response.ok){
        dashboardView();
        }}
    }
}

// <!-- Create Page (Only for logged-in users) -->
// <section id="create">
//   <div class="form">
//     <h2>Add Album</h2>
//     <form class="create-form">
//       <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
//       <input type="text" name="album" id="album-album" placeholder="Album" />
//       <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
//       <input type="text" name="release" id="album-release" placeholder="Release date" />
//       <input type="text" name="label" id="album-label" placeholder="Label" />
//       <input type="text" name="sales" id="album-sales" placeholder="Sales" />

//       <button type="submit">post</button>
//     </form>
//   </div>
// </section>