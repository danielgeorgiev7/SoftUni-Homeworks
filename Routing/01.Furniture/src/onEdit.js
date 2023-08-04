import page from '../node_modules/page/page.mjs';
import { reload } from "./app.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { toDetails } from './details.js';

export async function onEdit(e){
e.preventDefault();

let editTemplate = () => html`
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
            <div class="row space-top" id=${data._id}>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value=${data.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value=${data.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value=${data.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value=${data.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value=${data.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value=${data.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
    </div>
`


let id = e.target.parentElement.parentElement.parentElement.id;
let getResponse = await fetch(`http://localhost:3030/data/catalog/${id}`,{
method: 'GET',
headers: ({ 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken }),
});
let data = await getResponse.json();
render(editTemplate(data),document.querySelector('main'));

let make = document.querySelector('#new-make');
let model = document.querySelector('#new-model');
let year = document.querySelector('#new-year');
let description = document.querySelector('#new-description');
let price = document.querySelector('#new-price');
let img = document.querySelector('#new-image');
let material = document.querySelector('#new-material');

make.addEventListener('change',(e) => e.target.value.length < 4 ? e.target.classList.add('is-invalid') : e.target.classList.add('is-valid'));
make.addEventListener('change',(e) => e.target.value.length < 4 ? e.target.classList.remove('is-valid') : e.target.classList.remove('is-invalid'));
model.addEventListener('change',(e) => e.target.value.length < 4 ? e.target.classList.add('is-invalid') : e.target.classList.add('is-valid'));
model.addEventListener('change',(e) => e.target.value.length < 4 ? e.target.classList.remove('is-valid') : e.target.classList.remove('is-invalid'));
year.addEventListener('change',(e) => e.target.value < 1950 || e.target.value> 2050 ? e.target.classList.add('is-invalid') : e.target.classList.add('is-valid'));
year.addEventListener('change',(e) => e.target.value < 1950 || e.target.value> 2050 ? e.target.classList.remove('is-valid') : e.target.classList.remove('is-invalid'));
description.addEventListener('change',(e) => e.target.value.length <= 10 ? e.target.classList.add('is-invalid') : e.target.classList.add('is-valid'));
description.addEventListener('change',(e) => e.target.value.length <= 10 ? e.target.classList.remove('is-valid') : e.target.classList.remove('is-invalid'));
price.addEventListener('change',(e) => e.target.value <= 0? e.target.classList.add('is-invalid') : e.target.classList.add('is-valid'));
price.addEventListener('change',(e) => e.target.value <= 0 ? e.target.classList.remove('is-valid') : e.target.classList.remove('is-invalid'));
img.addEventListener('change',(e) => e.target.value.length <= 0 ? e.target.classList.add('is-invalid') : e.target.classList.add('is-valid'));
img.addEventListener('change',(e) => e.target.value.length <= 0 ? e.target.classList.remove('is-valid') : e.target.classList.remove('is-invalid'));

let editBtn = document.querySelector('[value="Edit"]');
editBtn.addEventListener('click',putRequest);

async function putRequest(ev){
ev.preventDefault();


if(!make.classList.contains('is-invalid') &&
!model.classList.contains('is-invalid') &&
!year.classList.contains('is-invalid') &&
!description.classList.contains('is-invalid') &&
!price.classList.contains('is-invalid') &&
!img.classList.contains('is-invalid')){

let putResponse = await fetch(`http://localhost:3030/data/catalog/${id}`,{
method: 'PUT',
headers: ({ 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken }),
body: JSON.stringify({make:make.value,model:model.value,year:year.value,description:description.value,price:price.value,img:img.value,material:material.value}),
});
if(putResponse.ok){
toDetails(ev);
}
}
}

}