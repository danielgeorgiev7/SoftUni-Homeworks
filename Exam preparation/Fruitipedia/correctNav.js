export function correctNav(){
if(sessionStorage.accessToken){
document.querySelector('div.guest').style.display = 'none';
document.querySelector('div.user').style.display = '';
}
else {
document.querySelector('div.user').style.display = 'none';
document.querySelector('div.guest').style.display = '';

}
}