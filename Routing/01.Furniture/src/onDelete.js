import { reload } from "./app.js";
export async function onDelete(e){
e.preventDefault();

let id = e.target.parentElement.parentElement.parentElement.id;

let response = await fetch(`http://localhost:3030/data/catalog/${id}`,{
method: 'DELETE',
headers: ({ 'X-Authorization': sessionStorage.accessToken }),
});

if(response.ok){
reload();
}
}