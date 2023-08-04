import page from '../node_modules/page/page.mjs'
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { toLogin } from './login.js';
import { toHome } from './toHome.js';
import { correctNav } from '../correctNav.js';
export function toRegister(){
        let registerTemplate = `<section id="register"><div class="form"><h2>Register</h2><form class="register-form"><input  type="text"  name="email"  id="register-email"  placeholder="email"/><input  type="password"  name="password"  id="register-password"  placeholder="password"/><input  type="password"  name="re-password"  id="repeat-password"  placeholder="repeat password"/><button type="submit">register</button><p id="notification"></p><p class="message">Already registered? <a href="/login">Login</a></p></form></div></section>`;
    document.querySelector('main').innerHTML = registerTemplate;
    document.querySelector('.message a').addEventListener('click', toLogin);

    let registerBtn = document.querySelector('.register-form button');
    registerBtn.addEventListener('click', onRegister);

    async function onRegister(e) {
        e.preventDefault();
        let email = document.querySelector('#register-email').value;
        let password = document.querySelector('#register-password').value;
        let rePass = document.querySelector('#repeat-password').value;
        let notification = document.querySelector('#notification');
        if (!email) {
            notification.textContent = 'Please enter your email!';
        }
        else if (!password) {
            notification.textContent = 'Please enter your password!';
        }
        else if (!rePass) {
            notification.textContent = 'Please repeat your password!';
        }
        else if (password !== rePass) {
            notification.textContent = 'Passwords are not matching!';
        }
        else {
            let response = await fetch('http://localhost:3030/users/register', {
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
            else if (response.status === 409) {
                notification.textContent = 'User is already registered!'
            }
            else {
                notification.textContent = 'Error! Please try again!';
            }
        }
    }
}