import { correctNav } from "./correctNav.js";
import page from "page/page.mjs";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { logout } from "./logout.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { profileView } from "./views/profile.js";

correctNav();
homeView();
document.querySelector('div.user [href="/"]').addEventListener('click', logout);

page('/', homeView)
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/dashboard', dashboardView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/myprofile', profileView);
page.start();