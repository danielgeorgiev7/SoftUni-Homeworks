import { html, render } from '../node_modules/lit-html/lit-html.js'
import { toDashboard } from './dashboard.js';
export function toCreate(){
let createTemplate = `<section id="create"><div class="form"><h2>Add Fruit</h2><form class="create-form"><input type="text"name="name"id="fruit-name"placeholder="Fruit Name"/><input type="text"name="imageUrl"id="fruit-image"placeholder="Fruit Image"/><textarea id="fruit-description"name="description"placeholder="Description"rows="10"cols="50"></textarea><textarea id="fruit-nutrition"name="nutrition"placeholder="Nutrition"rows="10"cols="50"></textarea><button type="submit">Add Fruit</button></form></div></section>`;

document.querySelector('main').innerHTML = createTemplate;

        document.querySelector('button').addEventListener('click', onCreate);

        async function onCreate(e){
        e.preventDefault();
        const name = document.querySelector('#fruit-name').value;
        const imageUrl = document.querySelector('#fruit-image').value;
        const description = document.querySelector('#fruit-description').value;
        const nutrition = document.querySelector('#fruit-nutrition').value;

      if(description!==''||nutrition!==''||name!==''||imageUrl!==''){  
          let response = await fetch('http://localhost:3030/data/fruits', {
        method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization' : sessionStorage.accessToken },
                body: JSON.stringify({name, imageUrl, description, nutrition,_ownerId:sessionStorage.id}),
        });
        if(response.ok){
        let data = await response.json();
        toDashboard();
        }}
    }
}