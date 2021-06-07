const router = require('express').Router();
const { Streetlights, User } = require('../models');



// GET all users for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model:User ,
          attributes: ['loggedIn'],
        },
      
      ],
    });
    
    const users = userData.map((user)=> 
    user.get({plain:true })
    );
    res.render('login',{
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

//routes to render '/login' view
// Remember, '/login' will need information about the user passed into it
router.get('/login', async (req, res) => {
  res.render('login');
});


//route to render '/register' view
router.get('/register',async (req,res) => {
  res.render('register');
});

// route to render '/main' view
router.get('/data',async (req,res) => {
  res.render('data');
});


// TODO: make '/logout' route. This will render '/login' view
router.get('/logout',async (req,res) => {
  res.render('logout');
});
// Even if we don't do login/logout routes correctly using sessions/cookies, 
// we can still make this route so that when the logout button is clicked,
// the user is redirected to the login view. This simulates a 'real' login/logout feature.



module.exports = router;
