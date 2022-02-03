const router = require('express').Router();

const finderRoutes = require('./chatfinder.js');
const groupRoutes = require('./groupchat.js');
// const soloRoutes = require('./solochat');

router.use('/chatfinder', finderRoutes);
// router.use('/solochat', soloRoutes);
router.use('/groupchat', groupRoutes);

module.exports = router;