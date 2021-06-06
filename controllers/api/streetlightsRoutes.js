const router = require('express').Router();
const { Streetlights } = require('../../models');



//route to make new streetlight in database
router.post('/', (req, res) => {
    Streetlights.create({
        base_colo: req.body.base_colo,
        contract_n: req.body.contract_n,
        decal_colo: req.body.decal_colo,
        decal_numb: req.body.decal_numb,
        install_da: req.body.install_da,
        lumens: req.body.lumens,
        mount_heig: req.body.mount_heig,
        nom_volt: req.body.nom_volt,
        owner: req.body.owner,
        style: req.body.style,
        watts: req.body.watts,
        work_effec: req.body.work_effec,
        latitude: req.body.latitude,
        longitude:req.body.longitude
    })      
       .then(streetlights => {
        
          res.status(200).json(streetlights);
          
       })
       .catch(err => {
           res.status(400).json(err);
       })
       
    
  });

  //Delete streetlight
  router.delete('/:id',(req,res)=>{
      Streetlights.destroy(
          {
              where:{
                  id:req.params.id
              }
            })
            .then(streetlightsData =>{
                if(!streetlightsData){
                    res.status(404).json({message:'No Streetlights data found with this id'});
                    return;
                }
                res.json(streetlightsData);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json(err);
            });
  });


// edit streetlight record
router.put('/edit/:id', (req, res) => {
    //calls update method on Streetlights model
    Streetlights.update({
        owner: req.body.owner
    },
    {
        where: {
            id: req.params.id,
        }
    })
    .then(updatedRecord => {
        res.json(updatedRecord);
    })
    .catch(err => res.json(err));
});



module.exports = router;
  
