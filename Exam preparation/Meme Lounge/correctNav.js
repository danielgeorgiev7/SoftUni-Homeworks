export function correctNav(){
    if(sessionStorage.accessToken){
    document.querySelector('div.guest').style.display = 'none';
    document.querySelector('div.user').style.display = '';
    document.querySelector('.profile span').textContent = `Welcome, ${sessionStorage.email}`;
    }
    else {
    document.querySelector('div.user').style.display = 'none';
    document.querySelector('div.guest').style.display = '';
    
    }
    }