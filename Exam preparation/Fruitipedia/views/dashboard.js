import page from '../node_modules/page/page.mjs'
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { toHome } from './toHome.js';
import { correctNav } from '../correctNav.js';
import { toDetails } from './details.js';

export async function toDashboard() {
    let response = await fetch('http://localhost:3030/data/fruits?sortBy=_createdOn%20desc', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });

    let data = await response.json();

    let dashboardArray = [`<h2>Fruits</h2>`];
    if (data.length > 0) {
        dashboardArray.push(`<section id="dashboard">`);
        data.forEach((el) => {
            if(el.imageUrl === '/images/fruit 1.png' || el.imageUrl === '/images/fruit 2.png' || el.imageUrl === '/images/fruit 3.png'){
            el.imageUrl = el.imageUrl.split(' ').join('');
            }
            dashboardArray.push(`<div class="fruit"><img src=${el.imageUrl} alt="example1" /><h3 class="title">${el.name}</h3><p class="description">${el.description}</p><a class="details-btn" href="/details/${el._id}">More Info</a></div>
`);
        });
        dashboardArray.push(`</section>`);
    }
        else {
            dashboardArray.push(`<h2>No fruit info yet.</h2>;</section>`);
        }

document.querySelector('main').innerHTML = dashboardArray.join('');
        }