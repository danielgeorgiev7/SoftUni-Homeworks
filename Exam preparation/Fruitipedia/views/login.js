import { html, render } from '../node_modules/lit-html/lit-html.js';
import { toRegister } from './register.js';
import page from '../node_modules/page/page.mjs'
import { toHome } from './toHome.js';
import { correctNav } from '../correctNav.js';

export function toLogin() {
    let loginTemplate = `<section id="login"><div class="form"><h2>Login</h2><form class="login-form"><input type="text" name="email" id="email" placeholder="email" /><input  type="password"  name="password"  id="password"  placeholder="password"/><button type="submit">login</button><p id="notification"></p><p class="message">Not registered? <a href="/register">Create an account</a></p></form></div></section>`;

 document.querySelector('main').innerHTML = loginTemplate;
    document.querySelector('.message a').addEventListener('click', toRegister);

    let loginBtn = document.querySelector('.login-form button');
    loginBtn.addEventListener('click', onLogin);

    async function onLogin(e) {
        e.preventDefault();
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        let notification = document.querySelector('#notification');
        if (!email) {
            notification.textContent = 'Please enter your email!';
        }
        else if (!password) {
            notification.textContent = 'Please enter your password!';
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
                toHome();
                page.redirect('/');
                correctNav();

            }
            else {
                notification.textContent = 'Error! Please try again!';
            }
        }
    }
}