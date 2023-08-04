import { correctNav } from "../correctNav.js";
import { toHome } from "./toHome.js";

export async function logout(){
    let response = await fetch('http://localhost:3030/users/logout',{
        method: 'GET',
        headers: {'X-Authorization':sessionStorage.accessToken}
        });
        if(response.ok){
        sessionStorage.clear();
        toHome();
        correctNav();
        }
}