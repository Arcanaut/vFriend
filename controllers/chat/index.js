const router = require('express').Router();

const finderRoutes = require('./chatfinder');
// const groupRoutes = require('./groupchat');
// const soloRoutes = require('./solochat');

router.use('/chatfinder', finderRoutes);
// router.use('/solochat', groupRoutes);
// router.use('/groupchat', soloRoutes);

module.exports = router;