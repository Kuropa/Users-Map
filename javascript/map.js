mapboxgl.accessToken = 'pk.eyJ1Ijoia3Vyb3BhIiwiYSI6ImNqejE3bW1yNzA3bDYzY25ybWJ4NHh4d3UifQ.MhxxfPV4YoH0RdH5c7lZxA';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

function addMarkersForMap(user) {
    const marker = new mapboxgl.Marker()
        .setLngLat(user.geometry.coordinates)
        .addTo(map);
}
