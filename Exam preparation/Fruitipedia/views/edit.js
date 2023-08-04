import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { toDashboard } from './dashboard.js';
import { toDetails } from './details.js';
export async function toEdit(ctx) {
  let id = ctx.params.id;

  let response = await fetch(`http://localhost:3030/data/fruits/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
  });

  if (response.ok) {
    let data = await response.json();
    let editTemplate = `<section id="edit"><div class="form"><h2>Edit Fruit</h2><form class="edit-form"><input  type="text"  name="name"  id="name"  placeholder="Fruit Name"/><input  type="text"  name="imageUrl"  id="Fruit-image"  placeholder="Fruit Image URL"/><textarea  id="fruit-description"  name="description"  placeholder="Description"  rows="10"  cols="50"></textarea><textarea  id="fruit-nutrition"  name="nutrition"  placeholder="Nutrition"  rows="10"  cols="50"></textarea>  <button href="/details/${id}" type="submit">post</button></form></div></section>`;

    document.querySelector('main').innerHTML = editTemplate;

    let name = document.querySelector('input[name="name"]');
    let imageUrl = document.querySelector('input[name="imageUrl"]');
    let description = document.querySelector('textarea[name="description"]');
    let nutrition = document.querySelector('textarea[name="nutrition"]');

    name.value = data.name;
    imageUrl.value = data.imageUrl;
    description.value = data.description;
    nutrition.value = data.nutrition;

    document.querySelector('button').addEventListener('click', onEdit);

    async function onEdit(e) {
      e.preventDefault();
      if(name.value !== '' || imageUrl.value !== '' || description.value !== '' || nutrition.value !== '') {

      let response = await fetch(`http://localhost:3030/data/fruits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
        body: JSON.stringify({ name: name.value, imageUrl: imageUrl.value, description: description.value, nutrition: nutrition.value })

      });

      if (response.ok) {
        toDetails(ctx);
        page.redirect(`/details/${id}`);
      }
    }
  }
  }
}
