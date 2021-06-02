/////////////////
// Leaflet map //
/////////////////
var mymap = L.map('mapid').setView([38.033554, 	-78.48], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXB1cnB1ciIsImEiOiJja24wYXlkZnEwbTNqMm9tbGdoM3R1OXE0In0.TCaPhnKXLVLFpJeUS1AKJQ'
}).addTo(mymap);



const fetchInitialStreetlightsData = async () => {
    // Fetch streetlights from Streetlights object upon initial page load
    const response = await fetch('/api/streetlights', {
        method: 'GET'
    });

    if (response.ok) {
        const streetlightsData = await response.json()
        console.log(streetlightsData[0]);

        // put points on map using Leaflet points cluster
        makePointsCluster(streetlightsData);
    }
}


const makePointsCluster = (pointsData) => {
    // makes clusters of points on map because rendering is very slow individually
    const markerClusters = L.markerClusterGroup();

    // iterate through each one of ~3600 markers
    for (let i = 0; i < pointsData.length; i++ ) {
        
        // adding information to popup window for each marker
        const popup = `
                       id: ${pointsData[i].id}  <br>
                       base_colo: ${pointsData[i].base_colo}  <br>
                       contract_n: ${pointsData[i].contract_n} <br>
                       decal_colo: ${pointsData[i].decal_colo}  <br>
                       decal_numb: ${pointsData[i].decal_numb} <br>
                       install_da: ${pointsData[i].install_da} <br>
                       lumens: ${pointsData[i].lumens} <br>
                       mount_heig: ${pointsData[i].mount_heig} <br>
                       nom_volt: ${pointsData[i].nom_volt} <br>
                       owner: ${pointsData[i].owner} <br>
                       style: ${pointsData[i].style} <br>
                       watts: ${pointsData[i].watts} <br>
                       work_effec: ${pointsData[i].work_effec} <br>
                       `;

        const lat = pointsData[i].latitude;
        const lon = pointsData[i].longitude;

        // Puts marker on the map
        const m = L.marker([lat, lon]).bindPopup(popup);

        markerClusters.addLayer(m);
    }

    mymap.addLayer(markerClusters);
};

/////////////////////
// Tabulator Table //
/////////////////////

//create Tabulator on DOM element with id "example-table"
const table = new Tabulator("#example-table", {
    height: 225, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout: "fitColumn", //fit columns to width of table (optional)
    columns: [ //Define Table Columns
        {title:"id", field:"id", width:100},
        {title:"base_colo", field:"base_colo", width:100},
        {title:"contract_n", field:"contract_n", width:100},
        {title:"decal_colo", field:"decal_colo", width:100},
        {title:"decal_numb", field:"decal_numb", width:100},
        {title:"install_da", field:"install_da", width:100},
        {title:"lumens", field:"lumens", width:100},
        {title:"mount_heig", field:"mount_heig", width:100},
        {title:"nom_volt", field:"nom_volt", width:100},
        {title:"owner", field:"owner", width:100},
        {title:"style", field:"style", width:100},
        {title:"watts", field:"watts", width:100},
        {title:"work_effec", field:"work_effec", width:100},
    ],
    rowClick:function(e, row){ //trigger an alert message when the row is clicked
        alert("Row " + row.getData().id + " Clicked!!!!");
    },
});

// //create Tabulator on DOM element with id "example-table"
// const table = new Tabulator("#example-table", {
//     height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
//     layout:"fitColumn", //fit columns to width of table (optional)
//     columns:[ //Define Table Columns
//         {title:"Name", field:"name", width:150},
//         {title:"Age", field:"age", align:"left", formatter:"progress"},
//         {title:"Favourite Color", field:"col"},
//         {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
//     ],
//     rowClick:function(e, row){ //trigger an alert message when the row is clicked
//         alert("Row " + row.getData().id + " Clicked!!!!");
//     },
// });

// //define some sample data
// var tabledata = [
// 	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
// 	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
// 	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
// 	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
// 	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
// ];

//load sample data into the table
// table.setData(tabledata);


fetchInitialStreetlightsData();