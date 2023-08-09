export async function profileView() {

    let response = await fetch(`http://localhost:3030/data/memes?where=_ownerId%3D%22${sessionStorage.id}%22&sortBy=_createdOn%20desc`,
        {
            method: 'GET', headers:{'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken}
        });

    let data = await response.json();

let profileTemplate = [`
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${sessionStorage.gender}.png">
    <div class="user-content">
        <p>Username: ${sessionStorage.username}</p>
        <p>Email: ${sessionStorage.email}</p>
        <p>My memes count: ${data.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">`];
if(data.length === 0) {
profileTemplate.push(`<p class="no-memes">No memes in database.</p>`)
}
else {
    data.forEach((el)=>{
profileTemplate.push(`<div class="user-meme">
<p class="user-meme-title">${el.title}</p>
<img class="userProfileImage" alt="meme-img" src=${el.imageUrl}>
<a class="button" href="/details/${el._id}">Details</a>
</div>`);
});
}

profileTemplate.push(`</div>
</section>`);

document.querySelector('main').innerHTML = profileTemplate.join('');

}


// <!-- Profile Page ( Only for logged users ) -->
// <section id="user-profile-page" class="user-profile">
//     <article class="user-info">
//         <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
//         <div class="user-content">
//             <p>Username: Mary</p>
//             <p>Email: mary@abv.bg</p>
//             <p>My memes count: 2</p>
//         </div>
//     </article>
//     <h1 id="user-listings-title">User Memes</h1>
//     <div class="user-meme-listings">
//         <!-- Display : All created memes by this user (If any) -->
//         <div class="user-meme">
//             <p class="user-meme-title">Java Script joke</p>
//             <img class="userProfileImage" alt="meme-img" src="/images/1.png">
//             <a class="button" href="#">Details</a>
//         </div>
//         <div class="user-meme">
//             <p class="user-meme-title">Bad code can present some problems</p>
//             <img class="userProfileImage" alt="meme-img" src="/images/3.png">
//             <a class="button" href="#">Details</a>
//         </div>

//         <!-- Display : If user doesn't have own memes  -->
//         <p class="no-memes">No memes in database.</p>
//     </div>
// </section>