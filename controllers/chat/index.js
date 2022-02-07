const router = require('express').Router();

const finderRoutes = require('./chatfinder.js');
const groupRoutes = require('./groupchat.js');


router.use('/chatfinder', finderRoutes);
router.use('/groupchat', groupRoutes);

module.exports = router;