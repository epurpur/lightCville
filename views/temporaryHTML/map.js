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
    console.log(data.features[0].properties);
    console.log(data.features[0].properties.GRID_ADDRE);


    // puts point clusters on map
    makePointsCluster(data);

    return data;
}


const makePointsCluster = (pointsData) => {
    // makes clusters of points because rendering is very slow individually
    const markerClusters = L.markerClusterGroup();

    for (let i = 0; i < pointsData.features.length; i++ ) {

        // WE CAN ADD ALL THE PROPERTIES TO THIS LATER
        const popup = `SUBTYPECD: ${pointsData.features[i].properties.SUBTYPECD.toString()}  <br>
                       GRID_ADDRE: ${pointsData.features[i].properties.GRID_ADDRE.toString()} <br>
                       WATTS: ${pointsData.features[i].properties.WATTS.toString()}  <br>
                       FIXTURE_ST: ${pointsData.features[i].properties.FIXTURE_ST.toString()} <br>
                       DECAL_COLO: ${pointsData.features[i].properties.DECAL_COLO.toString()} <br>
                       LUMENS: ${pointsData.features[i].properties.LUMENS.toString()} <br>`;

        const lat = pointsData.features[i].geometry.coordinates[1];
        const lon = pointsData.features[i].geometry.coordinates[0];

        // Puts marker on the map
        const m = L.marker([lat, lon]).bindPopup(popup);

        markerClusters.addLayer(m);
    }

    mymap.addLayer(markerClusters);
};

streetlightsData();