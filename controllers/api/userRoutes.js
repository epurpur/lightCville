const router = require('express').Router();
const { User }= require('../../models');

//creat new user 
router.post('/',async(req,res)=>{
  try{
    const userData = await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
    });
    //set up sessions with a 'loggedIn'variable set to 'true'
    req.session.save(()=>{
      req.session.loggIn=true;

      res.status(200).json(userData);
    });
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', (req, res) => {
  //validating username and email
  User.findOne({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  }).then(userData => {
    //userData is response sent from database request
   

    if (!userData) {
     res.status(400).json({ message: 'Incorrect input!' });
     return;
    }
    // validating encrypted password
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
     req.session.save(()=>{
       req.session.loggedIn = true;
       res.status(200).json({ user: userData,message: 'You are now logged In!!'})
     });

  });
})


 
 module.exports = router;