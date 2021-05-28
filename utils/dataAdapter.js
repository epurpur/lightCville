const { GEOMETRY } = require('sequelize/types');
const Data =require('../seeds/streetlights.json');
const adaptedData = Data.features.map((item)=>{
    const {WATTS,LUMENS}=item.properties

    const obj = {
        lat: item. geometry.coordinates[1],
        long:item.geometry.coordinates[0],
        WATTS,
        LUMENS,
    }
    return obj
});
