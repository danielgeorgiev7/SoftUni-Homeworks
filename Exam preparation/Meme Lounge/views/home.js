import page from 'page/page.mjs';
import {html,render} from 'lit-html/lit-html.js'
import { dashboardView } from './dashboard.js';

export function homeView(ctx){

if(sessionStorage.accessToken === undefined || ctx && ctx.logout){
let homeTemplate = `<section id="welcome"><div id="welcome-container"><h1>Welcome To Meme Lounge</h1><img src="/images/welcome-meme.jpg" alt="meme"><h2>Login to see our memes right away!</h2><div id="button-div"><a href="/login" class="button">Login</a><a href="/register" class="button">Register</a></div></div></section>`
document.querySelector('main').innerHTML = homeTemplate;
}
else if(ctx === undefined || ctx.logout === false ){
dashboardView();
page.redirect('/dashboard');
}
}

// <!-- Welcome Page ( Only for guest users ) -->
// <section id="welcome">
//     <div id="welcome-container">
//         <h1>Welcome To Meme Lounge</h1>
//         <img src="/images/welcome-meme.jpg" alt="meme">
//         <h2>Login to see our memes right away!</h2>
//         <div id="button-div">
//             <a href="#" class="button">Login</a>
//             <a href="#" class="button">Register</a>
//         </div>
//     </div>
// </section>
