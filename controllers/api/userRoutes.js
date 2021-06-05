const router = require('express').Router();
const { User }= require('../../models');



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

    res.status(200).json({ message: 'Successful login!' });
  });
})


 
 module.exports = router;