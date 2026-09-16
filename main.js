let map;
let bounds;

function initBikeMap() {
    map = new google.maps.Map(document.getElementById("bike-map"), {
        center: { lat: 41.15, lng: -73.88 },
        zoom: 12,
    });

    bounds = new google.maps.LatLngBounds();

    fetch('gpxFiles.json')
        .then(response => response.json())
        .then(gpxFiles => {
            gpxFiles.forEach(item => {
                loadGPX(item.file, item.color, item.label);
            });
        });
}

function loadGPX(file, color, label) {
    fetch(file)
        .then(response => response.text())
        .then(gpxText => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(gpxText, "application/xml");
            const points = xml.getElementsByTagName("trkpt");

            const routeCoords = [];
            for (let i = 0; i < points.length; i++) {
                const lat = parseFloat(points[i].getAttribute("lat"));
                const lng = parseFloat(points[i].getAttribute("lon"));
                routeCoords.push({ lat, lng });
            }

            const routePath = new google.maps.Polyline({
                path: routeCoords,
                geodesic: true,
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 3,
            });

            routePath.setMap(map);

            routeCoords.forEach(coord => bounds.extend(coord));
            map.fitBounds(bounds);

            const legend = document.getElementById('legend');
            const cleanedLabel = label.replace(/From\s+/i, '').replace(/\s+to\s+/i, ' → ');
            const item = document.createElement('div');
            item.innerHTML = `<span style="display:inline-block;width:24px;height:12px;background:${color};margin-right:8px;"></span> ${cleanedLabel}`;
            legend.appendChild(item);
        });
}