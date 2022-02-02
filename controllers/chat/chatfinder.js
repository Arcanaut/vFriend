
const router = require('express').Router();

router.get('/', async (req,res) => {
    try{
        //renders chatfinder.handlebars
        res.render('chatfinder', {
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});




module.exports = router;