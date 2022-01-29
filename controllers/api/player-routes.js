const router = require('express').Router();
const { Player } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) =>{
    Player.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbPlayerData => res.json(dbPlayerData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Player.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] }
    })
    .then(dbPlayerData => {
        if (!dbPlayerData) {
            res.status(404).json({ message:' no player found with that id' });
            return;
        }
        res.json(dbPlayerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects a {username: '..', email: '..', password: '..'}
    Player.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbPlayerData => res.json(dbPlayerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// login route /api/players/login
router.post('/login', (req, res) => {
    // expects {email: '..', password: '..'}
    Player.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbPlayerData => {
        if(!dbPlayerData) {
            res.status(400).json({ message: 'No user with that email address' });
            return;
        }

        const validPassword = dbPlayerData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        res.json({ player: dbPlayerData, message: 'You are now logged in!'})
       // res.json({ user: dbPlayerData });
    });
});

router.put('/:id', (req, res) => {
    // expects a {username: '..' email: '..', password: '...' for updating}

    // if req.body has exact same key/value pairs to match the model, you can just use req.body
    Player.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbPlayerData => {
        if (!dbPlayerData[0]) {
            res.status(404).json({ message: 'no player found with this id' });
            return;
        }
        res.json(dbPlayerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Player.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPlayerData => {
        if(!dbPlayerData) {
            res.status(404).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbPlayerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;