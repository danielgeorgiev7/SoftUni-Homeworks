import { render, html } from '../node_modules/lit-html/lit-html.js'
export async function results() {

    let searchTemplateArray = [`<section id="search"><div class="form"><h2>Search</h2><form class="search-form"><input type="text" name="search" id="search-input"><button class="button-list">Search</button></form></div>`];

    let value = document.querySelector('#search-input').value;

    let response = await fetch(`http://localhost:3030/data/fruits?where=name%20LIKE%20%22${value}%22`)

    if(response.ok){
    let data = await response.json();
    if(data.length === 0){
    searchTemplateArray.push([`<div class="search-result"><p class="no-result">No result.</p></div>`]);
    searchTemplateArray.push(`</section>`);
    }
    else {
    data.forEach((el)=>{
    searchTemplateArray.push([`<h4>Results:</h4>`]);
    searchTemplateArray.push([`<div class="search-result"><div class="fruit"><img src=${el.imageUrl} alt="example1"><h3 class="title">${el.name}</h3><p class="description">${el.description}</p><a class="details-btn" href="/details/${el._id}">More Info</a></div></div>`]);
    });
    searchTemplateArray.push(`</section>`);
    }
    document.querySelector('main').innerHTML = searchTemplateArray.join('');
    document.querySelector('button').addEventListener('click',(e)=>e.preventDefault());
    document.querySelector('button').addEventListener('click',results);
}
}