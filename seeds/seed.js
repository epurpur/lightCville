const sequelize = require('../config/connection');
const { User, Streetlights } = require('../models');

// const userData = require('./userData.json');
const streetlightsData = require('./streetlights.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const streetlights of streetlightsData) {
    await Streetlights.create({
      ...streetlights,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
