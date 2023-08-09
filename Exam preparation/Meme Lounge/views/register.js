
import page from 'page/page.mjs';
import { html, render } from 'lit-html/lit-html.js'

import { loginView } from './login.js';
import { homeView } from './home.js';
import { correctNav } from '../correctNav.js';
import { dashboardView } from './dashboard.js';
export function registerView() {
    let registerView = `<section id="register"><form id="register-form"><div class="container"><h1>Register</h1><label for="username">Username</label><input id="username" type="text" placeholder="Enter Username" name="username"><label for="email">Email</label><input id="email" type="text" placeholder="Enter Email" name="email"><label for="password">Password</label><input id="password" type="password" placeholder="Enter Password" name="password"><label for="repeatPass">Repeat Password</label><input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass"><div class="gender"><input type="radio" name="gender" id="female" value="female"><label for="female">Female</label><input type="radio" name="gender" id="male" value="male" checked><label for="male">Male</label></div><input type="submit" class="registerbtn button" value="Register"><p id="notification"></p><div class="container signin"><p>Already have an account?<a href="/login">Sign in</a>.</p></div></div></form></section>`
    document.querySelector('main').innerHTML = registerView;
    // document.querySelector('.message a').addEventListener('click', loginView);

    let registerBtn = document.querySelector('.registerbtn');
    registerBtn.addEventListener('click', onRegister);

    async function onRegister(e) {
        e.preventDefault();
        let username = document.querySelector('#username').value;
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        let rePass = document.querySelector('#repeatPass').value;
        let notification = document.querySelector('.notification');
        let femaleRadio = document.querySelector('#female');
        let gender = femaleRadio.checked === true ? 'female' : 'male';
        let span = document.querySelector('.notification span');
        if (!email) {
            span.textContent = 'Please enter your email!';
            setTimeout(() => { notification.style.display = 'block' }, 1);
            setTimeout(() => { notification.style.display = 'none' }, 6000);

        }
        else if (!username) {
            span.textContent = 'Please enter your username!';
            setTimeout(() => { notification.style.display = 'block' }, 1);
            setTimeout(() => { notification.style.display = 'none' }, 6000);
        }
        else if (!password) {
            span.textContent = 'Please enter your password!';
            setTimeout(() => { notification.style.display = 'block' }, 1);
            setTimeout(() => { notification.style.display = 'none' }, 6000);
        }
        else if (!rePass) {
            span.textContent = 'Please repeat your password!';
            setTimeout(() => { notification.style.display = 'block' }, 1);
            setTimeout(() => { notification.style.display = 'none' }, 6000);
        }
        else if (password !== rePass) {
            span.textContent = 'Passwords are not matching!';
            setTimeout(() => { notification.style.display = 'block' }, 1);
            setTimeout(() => { notification.style.display = 'none' }, 6000);
        }
        else {
            let response = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, gender }),
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
            else if (response.status === 409) {
                notification.textContent = 'User is already registered!'
            }
            else {
                notification.textContent = 'Error! Please try again!';
            }
        }
    }
}

// <!-- Register Page (Only for Guest users) -->
//  <section id="register">
//    <div class="form">
//      <h2>Register</h2>
//      <form class="login-form">
//        <input type="text" name="email" id="register-email" placeholder="email" />
//        <input type="password" name="password" id="register-password" placeholder="password" />
//        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
//        <button type="submit">register</button>
//        <p class="message">Already registered? <a href="#">Login</a></p>
//      </form>
//    </div>
//  </section>