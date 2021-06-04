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
               
                decal_colo: req.body.decal_colo,
                 lumens:req.body.lumens,
                 owner:req.body.owner,
                 watts:req.body.watts,
                 decal_numb:req.body.decal_numb,
                 mount_heig:req.body.mount_heig,
                 install_da:req.body.install_da,
                 style:req.body.style,
                 base_colo:req.body.base_colo,
                 nom_volt:req.body.nom_volt

        }
    });
    console.log(`\n ${filterData.length} \n`)
    res.status(200).json(filterData);
});


module.exports = router;
