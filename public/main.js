

let map, directionsService, directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.6139, lng: 77.2090 }, // Example: Delhi
        zoom: 16
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directions-panel')
    });
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Your Location'
                });
            },
            () => {
                // Handle location error
            }
        );
    }
}

function showRoute() {
    const destinations = {
        'Library': { lat: 28.6145, lng: 77.2080 },
        'Auditorium': { lat: 28.6130, lng: 77.2100 },
        'Cafeteria': { lat: 28.6150, lng: 77.2070 },
        'Admin': { lat: 28.6125, lng: 77.2095 }
    };
    const selected = document.getElementById('destination').value;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const destination = destinations[selected];
            const request = {
                origin,
                destination,
                travelMode: 'WALKING'
            };
            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                } else {
                    document.getElementById('directions-panel').innerHTML = '<p>Could not find walking route.</p>';
                }
            });
        });
    }
}

window.onload = function() {
    if (typeof google !== 'undefined') {
        initMap();
    }
};
