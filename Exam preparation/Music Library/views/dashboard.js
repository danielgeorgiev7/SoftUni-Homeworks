
import page from '../node_modules/page/page.mjs'
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { homeView } from './home.js';
import { correctNav } from '../correctNav.js';
import { detailsView } from './details.js';

export async function dashboardView() {
    let response = await fetch('http://localhost:3030/data/albums?sortBy=_createdOn%20desc', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    let data = await response.json();

    let dashboardArray = [`<section id="dashboard"><h2>Albums</h2>`];
    if (data.length > 0) {
        dashboardArray.push(` <ul class="card-wrapper">`);
        data.forEach((el) => {
            dashboardArray.push(`<li class="card"><img src=${el.imageUrl} alt="travis" /><p><strong>Singer/Band: </strong><span class="singer">${el.singer}</span></p><p><strong>Album name: </strong><span class="album">${el.album}</span></p><p><strong>Sales:</strong><span class="sales">${el.sales}</span></p><a class="details-btn" href="/details/${el._id}">Details</a></li>`);
        });
    }
    else {
        dashboardArray.push(`<h2>There are no albums added yet.</h2>`);
    }
    dashboardArray.push(`</section>`);

    document.querySelector('main').innerHTML = dashboardArray.join('');
}


{/* <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">

        <li class="card">
            <img src="./images/BackinBlack.jpeg" alt="travis" />
            <p>
                <strong>Singer/Band: </strong><span class="singer">AC/DC</span>
            </p>
            <p>
                <strong>Album name: </strong><span class="album">Back in Black</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">26 million (50 million claimed)</span></p>
            <a class="details-btn" href="">Details</a>
        </li>
        <li class="card">
            <img src="./images/beatles-1.jpg" alt="travis" />
            <p>
                <strong>Singer/Band: </strong><span class="singer">The Beatles</span>
            </p>
            <p>
                <strong>Album name: </strong><span class="album">1</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">26 million (31 million claimed)</span></p>
            <a class="details-btn" href="">Details</a>
        </li>
        <li class="card">
            <img src="./images/pink-floyd-the-wall.jpeg" alt="travis" />
            <p>
                <strong>Singer/Band: </strong><span class="singer">Pink Floyd</span>
            </p>
            <p>
                <strong>Album name: </strong><span class="album">The Wall</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">18 million (30 million claimed)</span></p>
            <a class="details-btn" href="">Details</a>
        </li>
    </ul>

    <h2>There are no albums added yet.</h2>
</section> */}