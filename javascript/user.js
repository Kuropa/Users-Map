let users;

function searchUserCard(userList) {
    const input = document.querySelector('.user-search');
    const matches = userList.querySelectorAll('.user-card  .user-description-wrap  .user-name');

    input.addEventListener('input', () => {
        let searchValue = document.querySelector('.user-search').value;
        searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

        if (searchValue !== '') {
            matches.forEach(e => {
                if (e.innerText.includes(searchValue)) {
                    e.closest('.user-card').classList.remove('hide');
                } else {
                    e.closest('.user-card').classList.add('hide');
                }
            });
        } else {
            matches.forEach(e => {
                e.closest('.user-card').classList.remove('hide');
            });
        }
    });
};

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

function parseDataFromServerAndRenderUsers(data) {
    users = JSON.parse(data).features;
    const userList = document.querySelector('.user-list');
    users.forEach(user => {
        renderUser(user, userList);
    })
    searchUserCard(userList);
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