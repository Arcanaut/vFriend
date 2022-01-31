const router = require('express').Router();
const sequelize = require('../config/connection');
const { Game, Player, Tag } = require('../models');

// Get all ..

// Login

//
router.get('/', function(req, res) {
    res.render('homepage')
});

router.get('/signup', function(req, res) {
    res.render('signup')
});




module.exports = router;

