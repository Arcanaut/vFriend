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

router.get('/:id', async (req, res) => {
  // find one game 
  try {
    console.log(req.params.id);
    const dbGameData = await Game.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!dbGameData) {
        res.status(404).json({ message: 'no games are found' });
        return;
    }
    console.log(dbGameData);
    req.session.save(() => {
      req.session.game = dbGameData.game_title;
      console.log(req.session.game);
      res
        .status(200)
        .json({ user: dbGameData, message: 'Your game is saved' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
