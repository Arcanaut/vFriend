const router = require('express').Router();

const playerRoutes = require('./player-routes');
const tagRoutes = require('./tag-routes');
const gameRoutes = require('./game-routes')

router.use('/tags', tagRoutes);
router.use('/players', playerRoutes);
router.use('/games', gameRoutes);

module.exports = router;