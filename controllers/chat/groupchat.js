const router = require('express').Router();

router.get('/', async (req,res) => {
    try{
        res.render('chatroom', {
            user_id: req.session.user_id,
            game: req.session.game,
            username: req.session.username,
            loggedIn: req.session.loggedIn,
        });
    } catch(err) {
        console.log(err);
        res.status(404).json(err);
    }
});

module.exports = router;