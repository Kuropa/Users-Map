const markers = {};

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Vyb3BhIiwiYSI6ImNqejE3bW1yNzA3bDYzY25ybWJ4NHh4d3UifQ.MhxxfPV4YoH0RdH5c7lZxA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [100.507, 13.745],
    });

function removeMarkerFromMap(key) {
    markers[key].remove();
    delete markers[key];
};

function addMarkerToMap(coordinates, id, card) {
    markers[id] = new mapboxgl.Marker({
        color: '#848484'
    })
    .setLngLat(coordinates)
    .addTo(map)
};

function addMarkersToObj(card) {
    const id = card.id;
    const user = users.find(user => {
        if (user.properties.id == id) {
            return true;
        }
        return false;
        });

    const coordinates = user.geometry.coordinates;
    addMarkerToMap(coordinates, id, card);
};

function isMarked(card, markers) {
    const key = card.id;
    const isMarkedCard = key in markers;
    if (isMarkedCard) {
        removeMarkerFromMap(key)
        return;
    }
    addMarkersToObj(card);
};

function searchCard() {
    const cardList = document.querySelector('.user-list');
    cardList.addEventListener('click', e => {
        const card = e.target.closest('.user-card');
        isMarked(card, markers)
    })
};

searchCard();