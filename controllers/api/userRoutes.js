const router = require('express').Router();
const { User }= require('../../models');


// GET /api/users to find all users
router.get('/', (req, res) => {
    User.findAll({
       attributes: { exclude: ['password'] }
    })
       .then(userData => res.json(userData))
       .catch(err => {
          console.log(err);
          res.status(500).json(err);
       });
 });
 //verify  user login
 router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }});
  
      const validPassword = userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      };
    
     
    // Create new user 

router.post('/registerUser', async (req, res) => {
    try {
        const userData = await User.create(req.body);

  //saving user and loggedin info
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
       //render to homepage if valid login
       res.render('home');
    }catch(err) {
        res.status(400).json(err);
    }
    });


    router.post('/logout', (req, res) => {
        console.log(`\n Logged in: ${req.session.logged_in}  \n`);
        
        if (req.session.logged_in) {
            res.render('login');
        }
        
    });



 
 module.exports = router;