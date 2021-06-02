const router = require('express').Router();
const { Streetlights, User } = require('../models');


// test route to render home route
router.get('/home', async (req, res) => {
  res.render('home');
});


// TODO: make route to render '/login' view
// Remember, '/login' will need information about the user passed into it
router.get('/login', async (req,res)=>{
  res.render('login');
});





// TODO: make route to render '/register' view

router.get('/register',async (req,res)=>{
  res.render('register');
});

// TODO: make route to render '/main' view
router.get('/main',async (req,res)=>{
  res.render('main');
});


// TODO: make '/logout' route. This will render '/login' view
router.get('/logout',async (req,res)=>{
  res.render('logout');
});
// Even if we don't do login/logout routes correctly using sessions/cookies, 
// we can still make this route so that when the logout button is clicked,
// the user is redirected to the login view. This simulates a 'real' login/logout feature.



module.exports = router;
