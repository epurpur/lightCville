
// Leaflet map
var mymap = L.map('mapid').setView([38.033554, 	-78.48], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXB1cnB1ciIsImEiOiJja24wYXlkZnEwbTNqMm9tbGdoM3R1OXE0In0.TCaPhnKXLVLFpJeUS1AKJQ'
}).addTo(mymap);


const streetlightsData = async () => {
    // Fetch streetlights.geojson

    const response = await fetch('../../seeds/streetlights.geojson')
    const data = await response.json();
    // console.log(data.features[0].geometry.coordinates);

    // puts point clusters on map
    makePointsCluster(data);

    return data;
}


const makePointsCluster = (pointsData) => {
    // makes clusters of points because rendering is very slow individually
    const markerClusters = L.markerClusterGroup();

    for (let i = 0; i < pointsData.features.length; i++ ) {
        const m = L.marker( [pointsData.features[i].geometry.coordinates[1], pointsData.features[i].geometry.coordinates[0]]);

        markerClusters.addLayer(m);
    }

    mymap.addLayer(markerClusters);
    // console.log(pointsData.features[0].geometry.coordinates)
    // console.log(pointsData.features);
}

streetlightsData();