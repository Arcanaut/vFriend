const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute.js');
const chatRoutes = require('./chat');

router.use('/', homeRoutes);
router.use('/chat', chatRoutes);

router.use('/api', apiRoutes);

module.exports = router;