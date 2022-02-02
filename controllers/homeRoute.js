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
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup')
});

router.get('/dashboard', function(req, res) {
    if (!req.session.loggedIn) {
        res.redirect('/signup');
        return;
    }
    res.render('dashboard')
});

router.get('/dashboard', function(req, res) {
    console.log(req.session);
    res.render('dashboard')
});




module.exports = router;

