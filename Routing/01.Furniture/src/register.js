import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { buttonsAnimation } from './app.js';
import { reload } from './app.js';


export function toRegister() {
    
    buttonsAnimation.forEach((el) => {
        if (el) el.classList.remove('active')
    }
    );
    buttonsAnimation[1].setAttribute('class', 'active');

    let registerPageTemplate = html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <p id="notification"></p>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
`
    let main = document.querySelector('main');
    render(registerPageTemplate, main);

    let registerBtn = document.querySelector('main .btn');
    registerBtn.addEventListener('click', onRegister);

    async function onRegister(e) {
        e.preventDefault();
        let email = document.querySelector('#email-input').value;
        let password = document.querySelector('#password-input').value;
        let rePass = document.querySelector('#rePass').value;
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