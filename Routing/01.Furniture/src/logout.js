import { reload } from "./app.js";

export async function onLogout(){

let response = await fetch('http://localhost:3030/users/logout',{
method: 'GET',
headers: {'X-Authorization':sessionStorage.accessToken}
});
if(response.ok){
sessionStorage.clear();
reload();
}
}