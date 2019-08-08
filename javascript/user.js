const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:4000/db', false);
xhr.send();

const usersJSONtext = xhr.response;
const usersJSON = JSON.parse(usersJSONtext);

for (let i = 0; i < usersJSON.features.length - 979; i++) {
    let userId;
    userId = usersJSON.features[i];
    
    class User {
        constructor(name, email, avatar, coordinates) {
            this.name = userId.properties['userName'];
            this.email = userId.properties['email'];
            this.url = userId.properties['url'];
            this.avatar = userId.properties['avatar'];
            this.coordinates = userId.geometry['coordinates'];
        }
    }
    
    const userCardList = [];
    userCardList.push(new User);

    const userList = document.querySelector('.user-list');
    
    function renderUser(user) {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
    
        const userAvatar = document.createElement('div');
        userAvatar.className = 'user-avatar';
    
        const avatarImg = document.createElement('img');
        avatarImg.className = 'user-avatar-img';
        avatarImg.src = user.avatar;
        
        const userDescriptionWrap = document.createElement('div');
        userDescriptionWrap.className = 'user-description-wrap';
    
        const name = document.createElement('p');
        name.className = 'user-name';
    
        const email = document.createElement('p');
        email.className = 'user-email';
    
        const url = document.createElement('a');
        url.className = 'user-url';
        url.href = user.url;
        url.target = '_blank';
        
        name.innerText = user.name;
        email.innerText = user.email;
        url.innerText = user.url;
        userList.appendChild(userCard);
        userCard.appendChild(userAvatar);
        userAvatar.appendChild(avatarImg);
        userCard.appendChild(userDescriptionWrap);
        userDescriptionWrap.appendChild(name);
        userDescriptionWrap.appendChild(email);
        userDescriptionWrap.appendChild(url);
    }

    for (let i = 0; i < userCardList.length; i++) {
        renderUser(userCardList[i]);
    } 
}



