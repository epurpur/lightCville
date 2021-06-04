const router = require('express').Router();
const { User, Streetlights } = require('../../models');


// Test route to get JSON of streetlights data from database
// Remember: when testing this endpoint it will be '/api/streetlights'
router.get('/streetlights', async (req, res) => {
  
  // finds all data for all streetlights
  const streetlightsData = await Streetlights.findAll();

  res.status(200).json(streetlightsData);
});


//route to make new User in database
router.post('/', (req, res) => {
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

router.post('/dataFilter', async (req, res) => {

    console.log('\n Filtered Data \n');

    // run sequelize query to find data that matches my parameters
    const filterData = await Streetlights.findAll({
        where: {
          base_colo: req.body.base_colo,
          decal_colo: req.body.decal_colo,
          decal_numb: req.body.decal_numb,
          install_da: req.body.install_da,
          lumens: req.body.lumens,
          mount_heig: req.body.mount_heig,
          nom_volt: req.body.nom_volt,
          owner: req.body.owner,
          style: req.body.style,
          watts: req.body.watts,
          work_effec: req.body.work_effec
        }
    });
    console.log(`\n ${filterData.length} \n`)
    res.status(200).json(filterData);
});




module.exports = router;
