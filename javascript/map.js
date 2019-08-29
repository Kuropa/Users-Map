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
    map.jumpTo({center: [100.507, 13.745], zoom: 0});
};

function addMarkerToMap(coordinates, id) {
    markers[id] = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map)
        map.jumpTo({center: coordinates, zoom: 0});
};

function addMarkersToObj(card) {
    const id = card.id;
    users.find(user => {
        if(user.properties['id'] == id) {
            const coordinates = user.geometry.coordinates;
            addMarkerToMap(coordinates, id);
        }
    })
};

function isMarking(card, markers) {
    const key = card.id;
    key in markers ? removeMarkerFromMap(key) : addMarkersToObj(card);
};

function getCard() {
    const cardList = document.querySelector('.user-list');
    cardList.addEventListener('click', e => {
        const card = e.target.closest('.user-card');
        isMarking(card, markers)
    })
};

getCard();