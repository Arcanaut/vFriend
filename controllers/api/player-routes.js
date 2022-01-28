const router = require('express').Router();
const { Player } = require('../../models');

router.get('/', (req, res) =>{
    Player.findAll()
        .then(dbPlayerData => res.json(dbPlayerData))
});

router.get('/:id', (req, res) => {});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;