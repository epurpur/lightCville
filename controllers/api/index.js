const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const userRoutes=require('./userRoutes');
const streetlightsRoutes=require('./streetlightsRoutes');
router.use('/', apiRoutes);
router.use('/user',userRoutes);
router.use('/streetlights',streetlightsRoutes);

module.exports = router;
