import page from '../node_modules/page/page.mjs';
import {html,render} from '../node_modules/lit-html/lit-html.js';

export function toHome(){
let homeTemplate = `<section id="home"><h1>Learn more about your favorite fruits</h1><img src="../images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png"alt="home"/></section>
`

document.querySelector('main').innerHTML = homeTemplate;
}