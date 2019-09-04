let users;

function renderUser(user, userList) {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.id = user.properties['id'];

    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar';

    const avatarImg = document.createElement('img');
    avatarImg.className = 'user-avatar-img';
    avatarImg.src = user.properties['avatar'];;

    const userDescriptionWrap = document.createElement('div');
    userDescriptionWrap.className = 'user-description-wrap';

    const name = document.createElement('p');
    name.className = 'user-name';

    const email = document.createElement('p');
    email.className = 'user-email';

    const url = document.createElement('a');
    url.className = 'user-url';
    url.href = user.properties['url'];
    url.target = '_blank';

    name.innerText = user.properties['userName'];
    email.innerText = user.properties['email'];
    url.innerText = user.properties['url'];
    userList.appendChild(userCard);
    userCard.appendChild(userAvatar);
    userAvatar.appendChild(avatarImg);
    userCard.appendChild(userDescriptionWrap);
    userDescriptionWrap.appendChild(name);
    userDescriptionWrap.appendChild(email);
    userDescriptionWrap.appendChild(url);
};

function removeAllCadr(userList) {
    while(userList.firstChild){
        userList.removeChild(userList.firstChild);
    }
};

function searchUserCard(users, userList) {
    const input = document.querySelector('.user-search');
    
    input.addEventListener('input', () => {
        let searchValue = input.value.toLowerCase();

        if (searchValue.length > 0) {
            removeAllCadr(userList);
            users.forEach(el => {
                let name = el.properties['userName'].toLowerCase();

                if (name.includes(searchValue)) {
                    renderUser(el, userList)
                }
            });
        } else {
            removeAllCadr(userList);
            parseUsers(users, userList);
        }
    });
};

function parseUsers(users, userList) {
    users.forEach(user => {
        renderUser(user, userList);
    });
}

function parseDataFromServerAndRenderUsers(data) {
    users = JSON.parse(data).features;
    const userList = document.querySelector('.user-list');
    
    parseUsers(users, userList)
    searchUserCard(users, userList);
};

function getDataFromServer() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:4000/db');
    xhr.onload = function() {
        if (xhr.status === 200) {
            parseDataFromServerAndRenderUsers(xhr.responseText);
        }
    }
    xhr.send();
};

getDataFromServer();