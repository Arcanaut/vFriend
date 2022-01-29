const router = require('express').Router();

const playerRoutes = require('./player-routes');

router.use('/players', playerRoutes);

module.exports = router;