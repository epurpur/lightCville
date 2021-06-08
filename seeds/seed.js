const sequelize = require('../config/connection');
const { Streetlights  } = require('../models');

// importing streetlights.json. This is where all the data lives
const streetlightData = require('./streetlights.json');

// mapping our data to a better format
const newData = streetlightData.features.map((item) => {
  
  // deconstruct data about each streetlight (item)
  const { WATTS, DECAL_COLO, DECAL_NUMB, MOUNT_HEIG, OWNER, INSTALL_DA, STYLE, WORK_EFFEC, LUMENS, CONTRACT_N, NOM_VOLT, BASE_COLO } = item.properties

  const obj = {
    watts: WATTS,
    decal_colo : DECAL_COLO,
    decal_numb: DECAL_NUMB,
    mount_heig: MOUNT_HEIG,
    owner: OWNER,
    install_da: INSTALL_DA,
    style: STYLE,
    work_effec: WORK_EFFEC,
    lumens:LUMENS,
    contract_n:CONTRACT_N,
    nom_volt:NOM_VOLT,
    base_colo:BASE_COLO,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
  }

  return obj

});


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  for (const streetlight of newData) {
    // create new streetlights record in database
    await Streetlights.create({
      //spread data for each streetlight
      ...streetlight
    });
  }

  process.exit(0);
}


seedDatabase();


module.exports = {seedDatabase,newData};
