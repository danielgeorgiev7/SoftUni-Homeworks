import {render,html} from '../node_modules/lit-html/lit-html.js'
import { results } from './results.js';
export async function toSearch(ctx){
let searchTemplate = `<section id="search"><div class="form"><h2>Search</h2><form class="search-form"><input type="text" name="search" id="search-input"><button class="button-list">Search</button></form></div></section>`;

document.querySelector('main').innerHTML = searchTemplate;
document.querySelector('button').addEventListener('click',(e)=>e.preventDefault());
document.querySelector('button').addEventListener('click',results);
}
