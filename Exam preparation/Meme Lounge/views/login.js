
import page from 'page/page.mjs';
import {html,render} from 'lit-html/lit-html.js'

import { registerView } from './register.js';
import { homeView } from './home.js';
import { correctNav } from '../correctNav.js';
import { dashboardView } from './dashboard.js';

export function loginView() {
    let loginTemplate = `<section id="login"><form id="login-form"><div class="container"><h1>Login</h1><label for="email">Email</label><input id="email" placeholder="Enter Email" name="email" type="text"><label for="password">Password</label><input id="password" type="password" placeholder="Enter Password" name="password"><input type="submit" class="registerbtn button" value="Login"><p id="notification"></p><div class="container signin"><p>Dont have an account?<a href="/register">Sign up</a>.</p></div></div></form></section>`
    document.querySelector('main').innerHTML = loginTemplate;
    // document.querySelector('.message a').addEventListener('click', registerView);

    let loginBtn = document.querySelector('.registerbtn');
    loginBtn.addEventListener('click', onLogin);

    async function onLogin(e) {
        e.preventDefault();
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        let notification = document.querySelector('.notification');
        let span = document.querySelector('.notification span');
        if (!email) {
            span.textContent = 'Please enter your email!';
            setTimeout(() => {notification.style.display = 'block'},1);
            setTimeout(() => {notification.style.display = 'none'},6000);
        }
        else if (!password) {
            span.textContent = 'Please enter your password!';
            setTimeout(() => {notification.style.display = 'block'},1);
            setTimeout(() => {notification.style.display = 'none'},6000);
        }
        else {
            let response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();

                sessionStorage.setItem('id', data._id);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('gender', data.gender);

                dashboardView();
                page.redirect('/dashboard');
                correctNav();

            }
            else {
                notification.textContent = 'Error! Please try again!';
            }
        }
    }
}



// <!-- Login Page ( Only for guest users ) -->
// <section id="login">
//     <form id="login-form">
//         <div class="container">
//             <h1>Login</h1>
//             <label for="email">Email</label>
//             <input id="email" placeholder="Enter Email" name="email" type="text">
//             <label for="password">Password</label>
//             <input id="password" type="password" placeholder="Enter Password" name="password">
//             <input type="submit" class="registerbtn button" value="Login">
//             <div class="container signin">
//                 <p>Dont have an account?<a href="#">Sign up</a>.</p>
//             </div>
//         </div>
//     </form>
// </section>