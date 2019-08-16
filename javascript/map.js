let marker;

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Vyb3BhIiwiYSI6ImNqejE3bW1yNzA3bDYzY25ybWJ4NHh4d3UifQ.MhxxfPV4YoH0RdH5c7lZxA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [100.507, 13.745],
    });

function removeMarkerFromMap() {
    marker.remove();
    map.jumpTo({center: [100.507, 13.745], zoom: 0});
};

function addMarkerToMap(coordinates) {
    marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map)
    map.jumpTo({center: coordinates, zoom: 10})
};

function getCoordinates(card, users) {
    if (card.classList.contains('selected')) {
        users.forEach(user => {
            if (card.id == user.properties['id']) {
                const coordinates = user.geometry.coordinates;
                addMarkerToMap(coordinates);
            }
        })
    } else {
        removeMarkerFromMap();
    }
};

function makeSelected() {
    const cardList = document.querySelector('.user-list');
    cardList.addEventListener( 'click', e => {
        const card = e.target.closest('.user-card');
        card.classList.contains('selected') ? card.classList.remove('selected') : card.classList.add('selected');
        getCoordinates(card, users);
    })
};
setTimeout(makeSelected, 5000);