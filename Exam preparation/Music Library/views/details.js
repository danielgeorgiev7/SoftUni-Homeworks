import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { dashboardView } from './dashboard.js';
import { homeView } from './home.js';
export async function detailsView(ctx) {
    let id = ctx.params.id;

    let response = await fetch(`http://localhost:3030/data/albums/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let likesResponse = await fetch(`http://localhost:3030/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let likes = await likesResponse.json();

    let checkResponse = await fetch(`http://localhost:3030/data/likes?where=albumId%3D%22${id}%22%20and%20_ownerId%3D%22${sessionStorage.id}%22&count`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let likesByThisUser = await checkResponse.json();


    if (response.ok) {
        let data = await response.json();

        let detailsTemplate = (data) => `<section id="details"><div id="details-wrapper"><p id="details-title">Album Details</p><div id="img-wrapper"><img src=${data.imageUrl} alt="example1" /></div><div id="info-wrapper"><p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p><p><strong>Album name:</strong><span id="details-album">${data.album}</span></p><p><strong>Release date:</strong><span id="details-release">${data.release}</span></p><p><strong>Label:</strong><span id="details-label">${data.label}</span></p> <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p></div><div id="likes">Likes: <span id="likes-count">${likes}</span></div><div id="action-buttons"><a href="" id="like-btn">Like</a><a href="/edit/${id}" id="edit-btn">Edit</a><a href="/dashboard" id="delete-btn">Delete</a></div></div></section>
        `

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
                let response = await fetch(`http://localhost:3030/data/albums/${id}`, {
                    method: 'DELETE',
                    headers: { 'X-Authorization': sessionStorage.accessToken },
                });
                //dashboardView();
            }
        }

        let likeBtn = document.querySelector('#like-btn');
        likeBtn.addEventListener('click', onLike);

        if(sessionStorage.id === undefined || sessionStorage.id === null || likesByThisUser>0 || data._ownerId === sessionStorage.id){
        likeBtn.remove();
        }

        async function onLike(e) {
            e.preventDefault();
            let response = await fetch(`http://localhost:3030/data/likes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
                body: JSON.stringify({
                                    albumId: id
                                }),
            });
            detailsView(ctx);
        }
    }
}


// <!-- Details page -->
// <section id="details">
//   <div id="details-wrapper">
//     <p id="details-title">Album Details</p>
//     <div id="img-wrapper">
//       <img src="./images/BackinBlack.jpeg" alt="example1" />
//     </div>
//     <div id="info-wrapper">
//       <p><strong>Band:</strong><span id="details-singer">AC/DC</span></p>
//       <p>
//         <strong>Album name:</strong><span id="details-album">Back in Black</span>
//       </p>
//       <p><strong>Release date:</strong><span id="details-release">1980</span></p>
//       <p><strong>Label:</strong><span id="details-label">Epic</span></p>
//       <p><strong>Sales:</strong><span id="details-sales">26 million (50 million claimed)</span></p>
//     </div>
//     <div id="likes">Likes: <span id="likes-count">0</span></div>

//     <!--Edit and Delete are only for creator-->
//     <div id="action-buttons">
//       <a href="" id="like-btn">Like</a>
//       <a href="" id="edit-btn">Edit</a>
//       <a href="" id="delete-btn">Delete</a>
//     </div>
//   </div>
// </section>