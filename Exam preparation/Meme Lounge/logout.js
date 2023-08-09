import { correctNav } from "../correctNav.js";
import { homeView } from "./views/home.js";
import page from 'page/page.mjs'

export async function logout(ctx){
    let response = await fetch('http://localhost:3030/users/logout',{
        method: 'GET',
        headers: {'X-Authorization':sessionStorage.accessToken}
        });
        if(response.ok){
        sessionStorage.accessToken = undefined;
        sessionStorage.clear();
        ctx.logout = true;
        correctNav(ctx);
        page.redirect('/');
        homeView();
        }
}