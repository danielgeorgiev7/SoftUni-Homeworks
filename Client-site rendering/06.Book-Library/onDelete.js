import { onLoad } from "./onLoad.js";

export async function onDelete(e){
let tr = e.target.parentElement.parentElement;
await fetch(`http://localhost:3030/jsonstore/collections/books/${tr.id}`,{
method: 'DELETE',
});
onLoad();
}