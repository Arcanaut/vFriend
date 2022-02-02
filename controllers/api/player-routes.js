const router = require('express').Router();
const req = require('express/lib/request');
const { Player } = require('../../models');

router.get('/', (req, res) =>{
    Player.findAll()
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
        }
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
    console.log(req.body);
    // expects a {username: '..', email: '..', password: '..'}
    Player.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbPlayerData => {
        req.session.save(() => {
            req.session.user_id = dbPlayerData.id;
            req.session.username = dbPlayerData.username;
            req.session.loggedIn = true;

            res.json(dbPlayerData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
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
            res.status(400).json({ message: 'incorrect password!' });
            return;
        }

        req.session.save(() => {
            //declare session variables 
            req.session.user_id = dbPlayerData.id;
            req.session.username = dbPlayerData.username;
            req.session.loggedIn = true;
            
            res.json({ user: dbPlayerData, message: 'you are now logged in!' });
        });
    });
});

router.put('/:id', async (req, res) => {
    // expects a {username: '..' email: '..', password: '...' for updating}

    // if req.body has exact same key/value pairs to match the model, you can just use req.body
    try {
        const dbPlayerData = await Player.update(
            {
                game: req.body.game,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (!dbPlayerData[0]) {
            res.status(404).json({ message: 'no players are found' });
            return;
        }
        console.log(req.body.game);
        console.log(dbPlayerData.game);
        console.log(dbPlayerData)
        req.session.save(() => {
            console.log('the save function ran');
            req.session.game = req.body.game;
            console.log(dbPlayerData);
            console.log(req.session.game);
            res
                .status(200)
                .json({ user: dbPlayerData, message: 'Your game is saved' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;