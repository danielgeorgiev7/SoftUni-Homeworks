import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { dashboardView } from './dashboard.js';
import { detailsView } from './details.js';
export async function editView(ctx) {
    let id = ctx.params.id;

    let response = await fetch(`http://localhost:3030/data/albums/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
    });

    if (response.ok) {
        let data = await response.json();
        let editTemplate = `<section id="edit"><div class="form"><h2>Edit Album</h2><form class="edit-form"><input type="text" name="singer" id="album-singer" placeholder="Singer/Band" /><input type="text" name="album" id="album-album" placeholder="Album" /><input type="text" name="imageUrl" id="album-img" placeholder="Image url" /><input type="text" name="release" id="album-release" placeholder="Release date" /><input type="text" name="label" id="album-label" placeholder="Label" /><input type="text" name="sales" id="album-sales" placeholder="Sales" /><button type="submit">post</button></form></div></section>`
        document.querySelector('main').innerHTML = editTemplate;

        let singer = document.querySelector('#album-singer');
        let album = document.querySelector('#album-album');
        let imageUrl = document.querySelector('#album-img');
        let release = document.querySelector('#album-release');
        let label = document.querySelector('#album-label');
        let sales = document.querySelector('#album-sales');

        singer.value = data.singer;
        album.value = data.album;
        imageUrl.value = data.imageUrl;
        release.value = data.release;
        label.value = data.label;
        sales.value = data.sales;

        document.querySelector('button').addEventListener('click', onEdit);

        async function onEdit(e) {
            e.preventDefault();
            if (singer.value !== '' && album.value !== '' && imageUrl.value !== '' && release.value !== '' && label.value !== '' && sales.value !== '') {
                {

                    let response = await fetch(`http://localhost:3030/data/albums/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
                        body: JSON.stringify({ singer: singer.value, album: album.value, imageUrl: imageUrl.value, release: release.value, label: label.value, sales: sales.value }),

                    });

                    if (response.ok) {
                        detailsView(ctx);
                        page.redirect(`/details/${id}`);
                    }
                }
            }
        }
    }
}


// <!-- Edit Page (Only for logged-in users) -->
// <section id="edit">
//   <div class="form">
//     <h2>Edit Album</h2>
//     <form class="edit-form">
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