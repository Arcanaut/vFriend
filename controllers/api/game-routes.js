const router = require('express').Router();
const { Game, Player } = require('../../models');

// {
//   attribute: ['id', 'game_title'],
//   include: {
//     model: Player,
//     attribute: [ 'id', 'username', 'email']
//   }
// }

router.get('/', (req, res) => {
  // find all games
  Game.findAll()
  .then(dbGameData => res.json(dbGameData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one game 
  Game.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbGameData => {
    if (!dbGameData) {
      res.status(404).json({ message: 'No game found with this id' });
      return;
    }
    res.json(dbGameData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new game
  Game.create({
    game_title: req.body.game_title
  })
  .then(dbGameData => {
      res.json(dbGameData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a Game by its `id` value
  Game.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbGameData => {
    if (!dbGameData) {
      res.status(404).json({ message: 'No Game found with this id' });
      return;
    }
    res.json(dbGameData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a Game by its `id` value
  Game.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbGameData => {
    if (!dbGameData) {
      res.status(404).json({ message: 'No Game found with this id' });
      return;
    }
    res.json(dbGameData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
