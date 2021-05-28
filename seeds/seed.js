// const sequelize = require('../config/connection');
// const { User, Streetlights } = require('../models');

// // const userData = require('./userData.json');
// const streetlightsData = require('./streetlights.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const streetlights of streetlightsData) {
//     await Streetlights.create({
//       ...streetlights,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();



const sequelize = require('../config/connection');
const { Streetlight  } = require('../models');

const streetlightData = require('./streetlights.json');

// mapping our data to a better format
const newData = streetlightData.features.map((item) => {
  
  const { WATTS, DECAL_COLO, DECAL_NUMB, MOUNT_HEIG, OWNER, INSTALL_DA, STYLE, WORK_EFFEC, LUMENS, CONTRACT_N, NOM_VOLT, BASE_COLO } = item.properties

  const obj = {
    WATTS,
    DECAL_COLO,
    DECAL_NUMB,
    MOUNT_HEIG,
    OWNER,
    INSTALL_DA,
    STYLE,
    WORK_EFFEC,
    LUMENS,
    CONTRACT_C,
    NOM_VOLT,
    BASE_COLO,
    LATITUDE: item.geometry.coordinates[1],
    LONGITUDE: item.geometry.coordinates[0],
  }

  return obj

});


MOUNT HEIG

