
import page from 'page/page.mjs';
import {html,render} from 'lit-html/lit-html.js'

import { homeView } from './home.js';
import { correctNav } from '../correctNav.js';
import { detailsView } from './details.js';

export async function dashboardView() {
    let response = await fetch('http://localhost:3030/data/memes?sortBy=_createdOn%20desc', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    let data = await response.json();

    let dashboardArray = [`<section id="meme-feed"><h1>All Memes</h1><div id="memes">`]; // SECTION HERE
    if (data.length > 0) {
        data.forEach((el) => {
            dashboardArray.push(`<div class="meme"><div class="card"><div class="info"><p class="meme-title">${el.title}</p><img class="meme-image" alt="meme-img" src=${el.imageUrl}></div><div id="data-buttons"><a class="button" href="/details/${el._id}">Details</a></div></div></div>`);  // EACH ELEMENT HERE
        });
    }
    else {
        dashboardArray.push(`<p class="no-memes">No memes in database.</p>`); // NO ELEMENTS SCENARIO HERE
    }
    dashboardArray.push(`</div></section>`);  // END OF SECTION HERE

    document.querySelector('main').innerHTML = dashboardArray.join('');
}


// <!-- All Memes Page ( for Guests and Users )-->
// <section id="meme-feed">
//     <h1>All Memes</h1>
//     <div id="memes">
//
//         <div class="meme">
//             <div class="card">
//                 <div class="info">
//                     <p class="meme-title">Debugging</p>
//                     <img class="meme-image" alt="meme-img" src="/images/2.png">
//                 </div>
//                 <div id="data-buttons">
//                     <a class="button" href="#">Details</a>
//                 </div>
//             </div>
//         </div>
//         <div class="meme">
//             <div class="card">
//                 <div class="info">
//                     <p class="meme-title">Java Script</p>
//                     <img class="meme-image" alt="meme-img" src="/images/4.png">
//                 </div>
//                 <div id="data-buttons">
//                     <a class="button" href="#">Details</a>
//                 </div>
//             </div>
//         </div>
//         <div class="meme">
//             <div class="card">
//                 <div class="info">
//                     <p class="meme-title">Yes, arrays are objects</p>
//                     <img class="meme-image" alt="meme-img" src="/images/6.png">
//                 </div>
//                 <div id="data-buttons">
//                     <a class="button" href="#">Details</a>
//                 </div>
//             </div>
//         </div>
//         <div class="meme">
//             <div class="card">
//                 <div class="info">
//                     <p class="meme-title">Java Script joke</p>
//                     <img class="meme-image" alt="meme-img" src="/images/1.png">
//                 </div>
//                 <div id="data-buttons">
//                     <a class="button" href="#">Details</a>
//                 </div>
//             </div>
//         </div>
//         <div class="meme">
//             <div class="card">
//                 <div class="info">
//                     <p class="meme-title">Bad code can present some problems</p>
//                     <img class="meme-image" alt="meme-img" src="/images/3.png">
//                 </div>
//                 <div id="data-buttons">
//                     <a class="button" href="#">Details</a>
//                 </div>
//             </div>
//         </div>
//         <!-- Display : If there are no memes in database -->
//         <p class="no-memes">No memes in database.</p>
//     </div>
// </section>