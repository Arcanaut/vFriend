const router = require('express').Router();
const { Tag, Player, Game } = require('../../models');

router.get('/', (req, res) => {
    // Find all Tag
    Tag.findAll({
        include: {
            model: Player
        }
    }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    // Find a single tag by id\
    Tag.findOne({
        attribute: ['id', 'tag_name'],
        include: {
            model: Player,
            attribute: [ 'id', 'username', 'email']
        }
    })
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // Create new Tag
    Tag.create(req.body)
    .then(dbTagData => {
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {
    // Update a tag's name by id 
    Tag.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbTagData => {
        if(!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    // Detele on Tag
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTagData => {
        if(!dbTagData) {
            res.status(404).jspon({ message: 'No tag found wit hthis id' });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;