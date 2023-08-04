import { html, render } from './node_modules/lit-html/lit-html.js';
import { buttonsAnimation } from './app.js';
import page from './node_modules/page/page.mjs';
import { reload } from './app.js';

export async function toCreate(e){
    e.preventDefault();
    buttonsAnimation.forEach((el) => {
        if (el) el.classList.remove('active')
    }
    );
    buttonsAnimation[3].setAttribute('class', 'active');

let createTemplate = html`
<div class="container" id="create">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
    </div>`

Array.from(document.querySelectorAll('.container')).forEach((el)=> {if(el.id!=='create')el.remove()});
render(createTemplate,document.querySelector('main'));
let createBtn = document.querySelector('[value="Create"]');
createBtn.addEventListener('click',onCreate);

let make = document.querySelector('[name="make"]');
let model = document.querySelector('[name="model"]');
let year = document.querySelector('[name="year"]');
let description = document.querySelector('[name="description"]');
let price = document.querySelector('[name="price"]');
let img = document.querySelector('[name="img"]');
let material = document.querySelector('[name="material"]');
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

async function onCreate(e){
    e.preventDefault();
let _ownerId = sessionStorage.id;
if(!make.classList.contains('is-invalid') &&
!model.classList.contains('is-invalid') &&
!year.classList.contains('is-invalid') &&
!description.classList.contains('is-invalid') &&
!price.classList.contains('is-invalid') &&
!img.classList.contains('is-invalid')){
let response = await fetch('http://localhost:3030/data/catalog',{
method: 'POST',
headers: {'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken},
body: JSON.stringify({_ownerId,make:make.value,model:model.value,year:year.value,description:description.value,price:price.value,img:img.value,material:material.value}),
});
if(response.ok){
reload();
}
}
}
}