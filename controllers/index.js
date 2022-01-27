const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute.js');
const viewRoutes = require('./view');

router.use('/', homeRoutes);
router.use('/views', viewRoutes);
router.use('/api', apiRoutes);

module.exports = router;