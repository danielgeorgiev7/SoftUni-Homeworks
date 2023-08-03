import { createElem } from './createElem.js'
//createElem(type,content,parent,attributes)
async function app() {

    let postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    let commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    let body = document.querySelector('body');
    let footer = document.querySelector('footer');
    let cancelBtn = document.querySelector('.cancel');
    let postBtn = document.querySelector('.public');
    let titleInput = document.querySelector('#topicName');
    let usernameInput = document.querySelector('#username');
    let textInput = document.querySelector('#postText');
    let topicTitle = document.querySelector('.topic-title');
    let homeBtn = document.querySelector('nav a');
    Array.from(topicTitle.children).forEach((el) => el.remove());

    let response = await fetch(postsUrl);
    let data = await response.json();
    if (response.ok) {
        if (data.hasOwnProperty('title')) { 
            let date = new Date().toISOString();
            addToHome(data.title, data.username, data.content, data._id, date);
        }
        else {
        Object.keys(data).forEach(key => {
            addToHome(data[key].title, data[key].username, data[key].content, data[key].postId, data[key].time);

        });
    }
    }


    cancelBtn.addEventListener('click', cancelFunc);
    function cancelFunc(e) {
        e.preventDefault();

        [titleInput, textInput, usernameInput].forEach((el) =>{
            el.textContent = '';
             el.value = '';
             console.log(el.textContent)
            });
    }

    postBtn.addEventListener('click', postFunc);
    async function postFunc(e) {
        e.preventDefault();
        try {
            let postId = new Date().getTime();
            let title = titleInput.value;
            let username = usernameInput.value;
            let content = textInput.value;
            if (!Boolean(title) || !Boolean(content) || !Boolean(username)) {
                return;
            }
            let date = new Date().toISOString();
            let response = await fetch(postsUrl, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    title, username, content, postId, 'time': date,
                }),
            });
            if (!response.ok) {
                throw new Error(response.status + ':' + response.statusText);
            }

            [titleInput, usernameInput, textInput].forEach((el) => el.value = '');
            addToHome(title, username, content, postId, date);
        }
        catch (err) {
            console.log(err);
        }
    }

    homeBtn.addEventListener('click', homeReload);
    function homeReload() {

        Array.from(body.children).forEach((el) => {
            if (el.tagName === 'SECTION') {
                el.style.display = 'none';
            }
            else {
                el.style.display = '';
            }
        })
    }

    
    function clickOnPost(e) {
        let currentElem = e.target;
        while (!currentElem.hasAttribute('postId')) {
            currentElem = currentElem.parentElement;

        }
        Array.from(body.children).forEach((el) => {
            if ((el.getAttribute('postId') === currentElem.getAttribute('postId'))
                || el.tagName === 'HEADER'
                || el.tagName === 'SCRIPT') {
                el.style.display = '';
            }
            else {
                el.style.display = 'none'
            }
        });
    }
    
    async function addToHome(title, username, content, postId, time) {
        let topicContainer = createElem('div', '', topicTitle, { 'class': 'topic-container' });
        let topicNameWrapper = createElem('div', '', topicContainer, { 'class': 'topic-name-wrapper', postId });
        let topicName = createElem('div', '', topicNameWrapper, { 'class': 'topic-name' });
        let anchor = createElem('a', '', topicName, { 'class': 'normal', 'href': '#' });
        let h2 = createElem('h2', title, anchor, {});

        let columns = createElem('div', '', topicName, { 'class': 'columns' });
        let div = createElem('div', '', columns, {});
        let timeElem = createElem('time', time, false, {});
        let pDate = createElem('p', '', div, {});
        pDate.appendChild(document.createTextNode('Date: '));
        pDate.appendChild(timeElem);
        let nickname = createElem('div', '', div, { 'class': 'nick-name' });
        let span = createElem('span', username, false, {});
        let pUsername = createElem('p', `Username: `, nickname, {});
        pUsername.appendChild(span);
        topicNameWrapper.addEventListener('click', clickOnPost);
        loadComments();

        //comments request
        async function loadComments() {
            let response = await fetch(commentsUrl);
            if (!response.ok) {
                throw new Error();
            }
            let commentsData = await response.json();
            Object.keys(commentsData).forEach((key) => {
                if (commentsData[key]['postId'] !== undefined && commentsData[key]['postId'] === postId) {
                    let comments = document.querySelectorAll('#user-content');
                    Array.from(comments).forEach((el) => el.remove());
                    let userComment = createElem('div', '', commentDiv, { 'id': 'user-comment' });
                    let topicNameWrapper2 = createElem('div', '', userComment, { 'id': 'topic-name-wrapper' });
                    let topicName2 = createElem('div', '', topicNameWrapper2, { 'id': 'topic-name' });
                    let commentedOn = createElem('p', '', topicName2, {});
                    let span3 = createElem('span', commentsData[key].time, commentedOn, {});
                    commentedOn.appendChild(document.createTextNode(' commented on '));
                    let time3 = createElem('time', commentsData[key].time, commentedOn, {});
                    let postContentDiv = createElem('div', '', topicName2, { 'class': 'post-content' });
                    let commentsContent = createElem('p', commentsData[key].content, postContentDiv, {});
                }
            });
        }


        //hidden elements
        let section = createElem('section', '', false, { postId });

        let divContainer = createElem('div','',section,{'class':'container'});
        let themeContent = createElem('div','',divContainer,{'class':'theme-content'});
        let themeTitle = createElem('div','',themeContent,{'class':'theme-title'});
        let nameWrapper = createElem('div','',themeTitle,{'class':'theme-name-wrapper'});
        let themeName = createElem('div','',nameWrapper,{'class':'theme-name'});
        let postClickedH2 = createElem('h2',title,themeName,{});


        let commentDiv = createElem('div', '', divContainer, { 'class': 'comment' });
        let headerDiv = createElem('div', '', commentDiv, { 'class': 'header' });
        let img = createElem('img', '', headerDiv, { 'src': './static/profile.png', 'alt': 'avatar' });
        let postedOn = createElem('p', '', headerDiv, {});
        let span2 = createElem('span', username, false, {});
        let time2 = createElem('time', time, false, {});
        console.log(username);
        console.log(time);
        postedOn.appendChild(span2);
        postedOn.appendChild(document.createTextNode(' posted on '));
        postedOn.appendChild(time2);
        let postContent = createElem('p', content, headerDiv, { 'class': 'post-content' });

        let answerComment = createElem('div', '', section, { 'class': 'answer-comment' });
        let commentedOn = createElem('p', '', answerComment, {});
        let commenterSpan = createElem('span', 'currentUser', commentedOn, {});
        commentedOn.appendChild(document.createTextNode(' comment:'));
        let answerDiv = createElem('div', '', answerComment, { 'class': 'answer' });
        let form = createElem('form', '', answerDiv, {});
        let textArea = createElem('textarea', '', form, { 'name': 'postText', 'id': 'comment', 'cols': '30', 'rows': '10' });
        let innerDiv = createElem('div', '', form, {});
        let label = createElem('label', '', innerDiv, { 'for': 'username' });
        label.appendChild(document.createTextNode('Username '));
        let labelSpan = createElem('span', '*', label, { 'class': 'red' });
        let input = createElem('input', '', innerDiv, { 'type': 'text', 'name': 'username', 'id': 'username' });
        let commentBtn = createElem('button', 'Post', form, {});

        commentBtn.addEventListener('click', postComment);

        async function postComment(e) {
            e.preventDefault();;
            if (Boolean(input.value) && Boolean(textArea.value)) {
                let date = new Date().toISOString()
                await fetch(commentsUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'username': input.value, 'content': textArea.value, 'time': date, postId }),
                });
            }
            input.value = '';
            textArea.value = '';
            loadComments();
        }

        body.insertBefore(section, footer);
        section.style.display = 'none';
    }

}
app();
