import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { toLogin} from './login.js';
import { toRegister } from './register.js';
import { onLogout } from './logout.js';
import { loadCatalog } from './loadCatalog.js';
import { toCreate } from './toCreate.js';
import { myPostsLoad } from './myPostsLoad.js';
import { toDetails } from './details.js';
import { onEdit } from './onEdit.js';

let loginBtn = document.querySelector('#loginLink');
let registerBtn = document.querySelector('#registerLink');
let logoutBtn = document.querySelector('#logoutBtn');
let dashboardBtn = document.querySelector('#catalogLink');
let createBtn = document.querySelector('#createLink');
let myPostsBtn = document.querySelector('#profileLink');
export let buttonsAnimation = [loginBtn, registerBtn, dashboardBtn, createBtn, myPostsBtn];

function onLoad() {
    reload();
    loginBtn.addEventListener('click', toLogin);
    registerBtn.addEventListener('click', toRegister);
    logoutBtn.addEventListener('click', onLogout);
    dashboardBtn.addEventListener('click', reload);
    createBtn.addEventListener('click', toCreate);
    myPostsBtn.addEventListener('click', myPostsLoad);
}

onLoad();
page('index.html','/');
page('/',reload);
page('/edit', onEdit);
page('/details', toDetails);
page('/create', toCreate);
page('/register', toRegister);
page('/login', toLogin);
page('/my-furniture', myPostsLoad);
page.start();

export async function reload() {
    let main = document.querySelector('main');
    buttonsAnimation.forEach((el) => {
        if (el) el.classList.remove('active')
    }
    );
    dashboardBtn.setAttribute('class', 'active');

    let welcomeTemplate = html` 
    <div class="container" id="welcome">      
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top" id="elements">
        <div>
    </div>`
    render(welcomeTemplate, document.querySelector('main'));

    if (sessionStorage.accessToken) {
        document.querySelector('.col-md-12 p').textContent = 'Select furniture from the catalog to view details.';
        document.querySelector('nav #user').style.display = '';
        document.querySelector('nav #guest').style.display = 'none';
        loadCatalog();
    }
    else {

        document.querySelector('.col-md-12 p').textContent = 'Please log in to continue.';
        document.querySelector('nav #user').style.display = 'none';
        document.querySelector('nav #guest').style.display = '';
        Array.from(document.querySelector('#elements').children).forEach((el)=>el.remove());
    }
}

