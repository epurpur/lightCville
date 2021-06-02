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
router.post('/', (req, res) => {
  console.log("hi",req.body);
  User.create({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
  })      
     .then(userData => {
      
        res.status(200).json(userData);
        
     });
  
});


//helper route to get userdata quickly
router.get('/getusers',(req,res)=>{
  const userData = User.findAll()
  .then(userData =>{
    const users = userData.map((item) => item.get({ plain: true }));
    res.status(200).json(userData);
  });
  

});

// TODO: make route to retrieve filtered data
// wait until we have '/home' view to figure this out


module.exports = router;
