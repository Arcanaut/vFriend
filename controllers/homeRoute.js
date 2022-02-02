const router = require('express').Router();
const sequelize = require('../config/connection');
const { Game, Player, Tag } = require('../models');

// Get all ..

// Sends viewer to home page where they are asked to login or signup
router.get('/', async (req,res) => {
    try{
        //renders hompage.handlebars
        res.render('homepage');
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

router.get('/signup', function(req, res) {
    if (req.session.loggedIn) {
        res.redirect('/chat/chatfinder');
        return;
    }
    res.render('signup')
});

module.exports = router;
router.get('/dashboard', function(req, res) {
    console.log(req.session);
    res.render('dashboard')
});






