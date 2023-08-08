import page from '../node_modules/page/page.mjs';
import {html,render} from '../node_modules/lit-html/lit-html.js';

export function homeView(){
let homeTemplate = `<section id="home"><img src="./images/landing.png" alt="home" /><h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right here!</span></h2></section>

`;
document.querySelector('main').innerHTML = homeTemplate;

}
// <!-- Home page -->
/* <section id="home">
  <img src="./images/landing.png" alt="home" />
  <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
      here!</span></h2>
</section> */
