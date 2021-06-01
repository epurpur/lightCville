const router = require('express').Router();
const { User, Streetlights } = require('../../models');


// Test route to get JSON of streetlights data from database
// Remember: when testing this endpoint it will be '/api/streetlights'
router.get('/streetlights', async (req, res) => {
  
  // finds all data for all streetlights
  const streetlightsData = await Streetlights.findAll();

  res.status(200).json(streetlightsData);
});


// TODO: make route to make new User in database
// Which type of route should this be? (GET, POST, PUT, DELETE)?




// TODO: make route to retrieve filtered data
// wait until we have '/home' view to figure this out


module.exports = router;
