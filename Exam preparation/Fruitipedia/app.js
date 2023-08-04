import page from './node_modules/page/page.mjs'
import { correctNav } from './correctNav.js';
import { toLogin } from './views/login.js';
import { toRegister } from './views/register.js';
import { toCreate } from './views/create.js';
import { toDashboard } from './views/dashboard.js';
import { toDetails } from './views/details.js';
import { toEdit } from './views/edit.js';
import { logout } from './views/logout.js';
import { toSearch } from './views/search.js';
import { toHome } from './views/toHome.js';
import { results } from './views/results.js';

page('/', toHome)
page('/search', toSearch);
page('/login', toLogin);
page('/register', toRegister);
page('/logout', logout);
page('/create', toCreate);
page('/dashboard', toDashboard);
page('/details/:id', toDetails);
page('/edit/:id', toEdit);
page('/search?key=value',results);

    page.start();

    toHome();
    correctNav();

    document.querySelector('#logout-btn').addEventListener('click', logout);