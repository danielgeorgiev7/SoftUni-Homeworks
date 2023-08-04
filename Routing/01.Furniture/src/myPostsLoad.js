import { buttonsAnimation } from "./app.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { toDetails } from './details.js';
import page from '../node_modules/page/page.mjs'

export async function myPostsLoad(e){
    e.preventDefault();

    buttonsAnimation.forEach((el) => {
        if (el) el.classList.remove('active')
    }
    );
    buttonsAnimation[4].setAttribute('class', 'active');
    let htmlItems = [];
    let myFurnitureTemplate = html`<div class="container" >
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
        <div class="row space-top" id="myFurniture">
        </div>
    </div>`
    render(myFurnitureTemplate,document.querySelector('main'));
    let myPostsTemplate = (el) => htmlItems.push(html`
        <div class="col-md-4">
            <div class="card text-white bg-primary">
            <div class="card-body" id=${el._id}>
                        <img src=${el.img} />
                        <p>${el.description}</p>
                        <footer>
                            <p>Price: <span>${el.price} $</span></p>
                        </footer>
                        <div>
                            <a href="#" class="btn btn-info" id="detailsBtn">Details</a>
                        </div>
                </div>
            </div>
        </div>`);

    let response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${sessionStorage.id}%22`,{
    method: 'GET',
    headers: {'Content-Type':'application/json', 'X-Authorization': sessionStorage.accessToken}
    })
    let data = await response.json();
    Array.from(data).forEach((el)=> myPostsTemplate(el));
    render(htmlItems,document.querySelector('#myFurniture'));
    let deleteButtons =  document.querySelectorAll('#detailsBtn');
    Array.from(deleteButtons).forEach((el)=> el.addEventListener('click',toDetails));
}