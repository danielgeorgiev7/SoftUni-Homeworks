import page from '../node_modules/page/page.mjs';
import { reload } from './app.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { buttonsAnimation } from './app.js';


export function toLogin() {

    buttonsAnimation.forEach((el) => {
        if (el) el.classList.remove('active');
    }
    );
    buttonsAnimation[0].setAttribute('class', 'active');

    let loginPageTemplate = html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form id=#loginForm>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email-input" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password-input" type="password" name="password">
                    </div>
                    <p id="notification"></p>
                    <input href="/" type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>`;
    let main = document.querySelector('main');
    render(loginPageTemplate, main);

    let loginBtn = document.querySelector('main .btn');
    loginBtn.addEventListener('click', onLogin);

    async function onLogin(e) {
        e.preventDefault();
        let email = document.querySelector('#email-input').value;
        let password = document.querySelector('#password-input').value;
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
                reload();

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