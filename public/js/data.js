var L = require('leaflet');
var Tabulator = require('tabulator-tables');

/////////////////
// Leaflet map //
/////////////////

const fetchInitialStreetlightsData = async () => {
    // Fetch streetlights from Streetlights object upon initial page load

    // Initialize map
    const mymap = L.map('mapid').setView([38.033554, 	-78.48], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXB1cnB1ciIsImEiOiJja24wYXlkZnEwbTNqMm9tbGdoM3R1OXE0In0.TCaPhnKXLVLFpJeUS1AKJQ'
    }).addTo(mymap);

    const response = await fetch('/api/streetlights', {
        method: 'GET'
    });

    if (response.ok) {
        const streetlightsData = await response.json()

        // put points on map using Leaflet points cluster
        makePointsCluster(streetlightsData, mymap);

        //put data into data table
        table.setData(streetlightsData);

        //set currentData so that it can be exported to a csv
        currentData = streetlightsData;

    }
}


const makePointsCluster = (pointsData, mymap) => {
    // makes clusters of points on map because rendering is very slow individually
    const markerClusters = L.markerClusterGroup();

    // iterate through each marker
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
                       <br>
                       <button type="button" class="btn btn-primary popupBtn" data-bs-toggle="modal" data-bs-target="#editRecordModal" 
                       onclick="editRecord(${pointsData[i].id},${pointsData[i].base_colo},${pointsData[i].contract_n},'${pointsData[i].decal_colo}',${pointsData[i].decal_numb},${pointsData[i].lumens},${pointsData[i].mount_heig},${pointsData[i].nom_volt},'${pointsData[i].owner}','${pointsData[i].style}',${pointsData[i].watts},'${pointsData[i].work_effec}')">Edit</button>
                       
                       <button type="button" class="btn btn-primary popupBtn" data-idNumDelete="${pointsData[i].id}" id="deleteRecordBtn" onclick="deleteRecord()">Delete</button>
                       `;

        const lat = pointsData[i].latitude;
        const lon = pointsData[i].longitude;

        // Puts marker on the map and binds popup to it
        const m = L.marker([lat, lon]).bindPopup(popup);

        markerClusters.addLayer(m);
    }
    const layerGroup = L.layerGroup([markerClusters]);
        
    mymap.addLayer(layerGroup);

};


const createFilteredMap = (filteredData) => {
    console.log("Data returned from request:", filteredData);

    // Initialize map
    var mymap = L.map('mapid').setView([38.033554, 	-78.48], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXB1cnB1ciIsImEiOiJja24wYXlkZnEwbTNqMm9tbGdoM3R1OXE0In0.TCaPhnKXLVLFpJeUS1AKJQ'
    }).addTo(mymap);

    // put points on map
    makePointsCluster(filteredData, mymap);

};


// functions to execute on button click
const dataFilter = (event) => {
    event.preventDefault();

    // delete map html element
    const elem = document.getElementById("mapid").remove();

    // create new map html element and prepend to parent element
    const parentElem = document.getElementById("dataSection")
    const newMap = document.createElement('div')
    newMap.setAttribute('id', 'mapid');
    parentElem.prepend(newMap);


    // fetches filtered dataset to display on map
    dataFetch()

};

/////////////////////
// Tabulator Table //
/////////////////////

//create Tabulator on DOM element with id "example-table"
const table = new Tabulator("#dataTable", {
    height: 300, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout:"fitColumns", //fit columns to width of table (optional)
    columns: [ //Define Table Columns
        {title:"id", field:"id", width:175},
        {title:"base_colo", field:"base_colo", width:175},
        {title:"contract_n", field:"contract_n", width:175},
        {title:"decal_colo", field:"decal_colo", width:175},
        {title:"decal_numb", field:"decal_numb", width:175},
        {title:"install_da", field:"install_da", width:175},
        {title:"lumens", field:"lumens", width:175},
        {title:"mount_heig", field:"mount_heig", width:175},
        {title:"nom_volt", field:"nom_volt", width:175},
        {title:"owner", field:"owner", width:175},
        {title:"style", field:"style", width:175},
        {title:"watts", field:"watts", width:175},
        {title:"work_effec", field:"work_effec", width:175},
    ],
});



//////////////////////////////////////
// add event handlers to each button//
//////////////////////////////////////

//This holds current table data
let currentData = {};

const exportToCSV = async () => {
    // takes current filtered version of dataset and exports to csv
    // uses global currentData variable

    console.log(currentData);
    
    // //convert array to csv
    const csvString = convertToCSV(currentData);
    
    // download filtered dataset as a csv file
    download(csvString, 'streetlightsData.csv', 'text/csv;encoding:utf-8');
};

function convertToCSV(objArray) {
    // converts JSON object to CSV

    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    //returns CSV as a string
    return str;
}

var download = function(content, fileName, mimeType) {
    // The download function takes a CSV string, the filename and mimeType as parameters
    // Scroll/look down at the bottom of this snippet to see how download is called

    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
    
    if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
        type: mimeType
        }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
}



// select other button elements in DOM
const exportBtn = document.querySelector('#exportBtn').addEventListener('click', exportToCSV);


const editRecord = async (recordID, base_colo, contract_n, decal_colo, decal_numb, lumens, mount_heig, nom_volt, owner, style, watts, work_effec) => {
    // allows editing chosen record

    // use all elements in 
    //recordID is id of chosen record, passed in from popup window
    document.querySelector('#editID').innerHTML = recordID;
    document.querySelector('#editbase_colo').setAttribute('value', base_colo);
    document.querySelector('#editcontract_n').setAttribute('value', contract_n);
    document.querySelector('#editdecal_colo').value = decal_colo;
    document.querySelector('#editdecal_numb [value="' + decal_numb + '"]').selected = true;
    document.querySelector('#editlumens [value="' + lumens + '"]').selected = true;
    document.querySelector('#editmount_heig').innerHTML = mount_heig;
    document.querySelector('#editnom_volt').innerHTML = nom_volt;
    document.querySelector('#editowner').value = owner;
    document.querySelector('#editstyle').value = style;
    document.querySelector('#editwatts [value="' + watts + '"]').selected = true;
    
    //need to do some string slicing to set date
    // '2015-12-31';  // date must be in this format
    work_effec = work_effec.slice(0, work_effec.indexOf('T'));
    document.querySelector('#editwork_effec').value = work_effec;
};


const saveEditRecord = async () => {
    // executes fetch request to update chosen record

    //select all updated record values
    const recordID = document.querySelector('#editID').innerHTML;
    
    let base_colo = document.querySelector('#editbase_colo').value.trim();
    if (!base_colo) {base_colo = null};
    
    let contract_n = document.querySelector('#editcontract_n').value.trim();
    if (!contract_n) {contract_n = null};
    
    let decal_colo = document.querySelector('#editdecal_colo');
    decal_colo = decal_colo.options[decal_colo.selectedIndex].text;
    if (decal_colo === "Choose...") {decal_colo = null};

    let decal_numb = document.querySelector('#editdecal_numb');
    decal_numb = decal_numb.options[decal_numb.selectedIndex].text;
    if (decal_numb === "Choose...") {decal_numb = null};

    let lumens = document.querySelector('#editlumens');
    lumens = lumens.options[lumens.selectedIndex].text;
    if (lumens === "Choose...") {lumens = null};
 
    let mount_heig = document.querySelector('#editmount_heig').value.trim();
    if (!mount_heig) {mount_heig = null};

    let nom_volt = document.querySelector('#editnom_volt').value.trim();
    if (!nom_volt) {nom_volt = null};

    let owner = document.querySelector('#editowner');
    owner = owner.options[owner.selectedIndex];
    if (owner === "Choose..." || owner === 'None' || typeof(owner) == 'undefined') {owner = null};

    let style = document.querySelector('#editstyle');
    style = style.options[style.selectedIndex].text;
    if (style === "Choose...") {style = null};

    let watts = document.querySelector('#editwatts');
    watts = watts.options[watts.selectedIndex].text;
    if (watts === "Choose...") {watts = null};

    let work_effec = document.querySelector('#editwork_effec').value.trim();
    if (work_effec === '') {work_effec = null};
    console.log(recordID);
    console.log(recordID, base_colo, contract_n, decal_colo, decal_numb, lumens, mount_heig, nom_volt, owner, style, watts, work_effec);
    // make fetch request to PUT route to update record
    const response = await fetch(`/api/streetlights/edit/${recordID}`, {
        method: 'PUT',
        body: JSON.stringify({ recordID, base_colo, contract_n, decal_colo, decal_numb, lumens, mount_heig, nom_volt, owner, style, watts, work_effec }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        alert('Record Updated!');
        //reload page
        window.location.reload();        
    }
}

const deleteRecord = async () => {
    // deletes the chosen record when clicking 'delete' button in popup window
    
    // select data-idNumDelete attribute of 'edit' button, which holds value of record id
    const recordID = document.querySelector('#deleteRecordBtn').getAttribute('data-idNumDelete');  

    // send fetch request to delete chosen record
    const response = await fetch(`/api/streetlights/${recordID}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        alert('Record Deleted!');
        //reload page
        window.location.reload();
    }
};



///////////////////
// Modal Buttons //
///////////////////

// 'Filter' button in data filter modal
const makeDataFilterBtn = document.querySelector('#makeDataFilterBtn').addEventListener('click', dataFilter)

const dataFetch = async () => {
    // makes fetch request to database with user-provided parameters

    // get select input values provided by user.
    // coerce data to be string, null, etc
    let decal_colo = document.querySelector('#decal_colo').value.trim();
    if (decal_colo === "Choose...") {decal_colo = null};
    
    let owner = document.querySelector('#owner').value.trim();
    if (owner === "Choose..." || owner === "None") {owner = null};
    
    let lumens = document.querySelector('#lumens').value.trim();
    if (lumens === "Choose...") {lumens = null};

    //choose fetch response to make based on user filters
    if (decal_colo === null && lumens != null) {
        // if no decal_colo but yes lumens
        const response = await fetch('/api/FilterNoDCYesL', {
            method: 'POST',
            body: JSON.stringify({ owner, lumens }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const filteredData = await response.json();
            // create map with filtered data
            createFilteredMap(filteredData);
            // put filtered data into data table
            table.setData(filteredData);
            //set currentData so that it can be exported to a csv
            currentData = filteredData;
        }
    } else if (decal_colo === null && lumens === null) {
        // if no decal and no lumens
        const response = await fetch('/api/FilterNoDCNoL', {
            method: 'POST',
            body: JSON.stringify({ owner }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const filteredData = await response.json();
            // create map with filtered data
            createFilteredMap(filteredData);
            // put filtered data into data table
            table.setData(filteredData);
            //set currentData so that it can be exported to a csv
            currentData = filteredData;
        }
    } else if (decal_colo != null && lumens === null) {
        // if yes decal_colo and no lumens
        const response = await fetch('/api/FilterYesDCNoL', {
            method: 'POST',
            body: JSON.stringify({ decal_colo, owner }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const filteredData = await response.json();
            // create map with filtered data
            createFilteredMap(filteredData);
            // put filtered data into data table
            table.setData(filteredData);
            //set currentData so that it can be exported to a csv
            currentData = filteredData;
        }
    } else if (decal_colo != null && lumens != null) {
        // if yes decal_colo and yes lumens
        const response = await fetch('/api/FilterYesDCYesL', {
            method: 'POST',
            body: JSON.stringify({ decal_colo, owner, lumens }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const filteredData = await response.json();
            // create map with filtered data
            createFilteredMap(filteredData);
            // put filtered data into data table
            table.setData(filteredData);
            //set currentData so that it can be exported to a csv
            currentData = filteredData;
        }
    }
}


const addRecord = async () => {
    // adds streetlight record to database

    // start by selecting values of all input fields
    let base_colo = document.querySelector('#base_colo_add').value.trim();
    if (!base_colo) {base_colo = null};
    
    let contract_n = document.querySelector('#contract_n_add').value.trim();
    if (!contract_n) {contract_n = null};
    
    let decal_colo = document.querySelector('#decal_colo_add');
    decal_colo = decal_colo.options[decal_colo.selectedIndex].text;
    if (decal_colo === "Choose...") {decal_colo = null};

    let decal_numb = document.querySelector('#decal_numb_add');
    decal_numb = decal_numb.options[decal_numb.selectedIndex].text;
    if (decal_numb === "Choose...") {decal_numb = null};

    //gets current datetime stamp
    let install_da = new Date().toLocaleString();

    let lumens = document.querySelector('#lumens_add');
    lumens = lumens.options[lumens.selectedIndex].text;
    if (lumens === "Choose...") {lumens = null};
 
    let mount_heig = document.querySelector('#mount_heig_add').value.trim();
    if (!mount_heig) {mount_heig = null};

    let nom_volt = document.querySelector('#nom_volt_add').value.trim();
    if (!nom_volt) {nom_volt = null};

    let owner = document.querySelector('#owner_add');
    owner = owner.options[owner.selectedIndex].text;
    if (owner === "Choose..." || owner === 'None') {owner = null};

    let style = document.querySelector('#style_add');
    style = style.options[style.selectedIndex].text;
    if (style === "Choose...") {style = null};

    let watts = document.querySelector('#watts_add');
    watts = watts.options[watts.selectedIndex].text;
    if (watts === "Choose...") {watts = null};

    let work_effec = document.querySelector('#work_effec_add').value.trim();
    if (work_effec === '') {work_effec = null};

    //latitude and longitude are required values
    let latitude = document.querySelector('#latitude_add').value.trim();
    let longitude = document.querySelector('#longitude_add').value.trim();
    

    // take all values and make fetch request to database to create new streetlight record
    const response = await fetch('/api/streetlights', {
        method: 'POST',
        // body: JSON.stringify({ base_colo, contract_n, decal_colo, decal_numb, install_da, lumens, mount_heig, nom_volt, owner, style, watts, work_effec, latitude, longitude }),
        body: JSON.stringify({ base_colo, contract_n, decal_colo, decal_numb, install_da, lumens, mount_heig, nom_volt, owner, style, watts, work_effec, latitude, longitude }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Record Added')
        //reload page in browser
        window.location.reload();
    } else {
        alert('Invalid input');
    }

}

// 'Add' button in Add Record modal
const addBtn = document.querySelector('#addBtn').addEventListener('click', addRecord);


// execute on page load
fetchInitialStreetlightsData();