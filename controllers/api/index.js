const router = require('express').Router();
const userRoutes = require('./userRoutes');
const streetlightRoutes = require('./streetlightRoutes');

router.use('/users', userRoutes);
router.use('/streetlightData', streetlightRoutes);

module.exports = router;
