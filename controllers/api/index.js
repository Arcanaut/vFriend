const router = require('express').Router();

const playerRoutes = require('./player-routes');
const tagRoutes = require('./tag-routes');

router.use('/tags', tagRoutes);
router.use('/players', playerRoutes);

module.exports = router;