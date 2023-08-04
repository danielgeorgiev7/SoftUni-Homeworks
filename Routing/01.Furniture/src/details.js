import { html, render } from '../node_modules/lit-html/lit-html.js';
import { buttonsAnimation } from './app.js';
import page from '../node_modules/page/page.mjs';
import { onDelete } from './onDelete.js';
import { onEdit } from './onEdit.js';

export async function toDetails(e) {
    e.preventDefault();
    
    buttonsAnimation.forEach((el) => {
        if (el) el.classList.remove('active')
    }
    );
    let detailsTemplate = (data) => html`
     <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top"  id=${data._id}>
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${data.img} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div>
                    <a href="/edit/${data._id}"  class="btn btn-info" id="editBtn">Edit</a>
                    <a class="btn btn-red" id="deleteBtn">Delete</a>
                </div>
            </div>
        </div>
    </div>
    `
    let id = e.target.parentElement.parentElement.id;
    let response = await fetch(`http://localhost:3030/data/catalog/${id}`, {
        method: 'GET',
        headers: ({ 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken }),
    });
    if (response.ok) {
        let data = await response.json();
        if (data.material === '') {
            data.material = 'Not Stated'
        }
        render(detailsTemplate(data), document.querySelector('main'));
        if (sessionStorage.id !== data._ownerId) {
            document.querySelector('#editBtn').style.display = 'none';
            document.querySelector('#deleteBtn').style.display = 'none';
        }
        else {
        document.querySelector('#editBtn').addEventListener('click',onEdit);
        document.querySelector('#deleteBtn').addEventListener('click',onDelete);
        }
    }
}