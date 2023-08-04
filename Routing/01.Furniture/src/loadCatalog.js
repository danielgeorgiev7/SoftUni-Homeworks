import { html, render } from '../node_modules/lit-html/lit-html.js';
import { toDetails } from './details.js';

export async function loadCatalog(){

    let response = await fetch('http://localhost:3030/data/catalog');
    let data = await response.json();
    let dataHtml = [];
        
    data.forEach((el) => {
        dataHtml.push(html`
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body" id=${el._id}>
                        <img src="${el.img}">
                        <p>${el.description}</p>
                        <footer>
                            <p>Price: <span>${el.price} $</span></p>
                        </footer>
                        <div>
                            <a href="/details/${el._id}" class="btn btn-info" id="detailsBtn">Details</a>
                        </div>
                </div>
            </div>
        </div>`);
    });
    render(dataHtml, document.querySelector('#elements'));
    let deleteButtons =  document.querySelectorAll('#detailsBtn');
    Array.from(deleteButtons).forEach((el)=> el.addEventListener('click',toDetails));
}