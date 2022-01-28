//This has no declared variables it's a middleware function 
//in utils to be used multiple times in multiple files
//can be changed for passport
const authorize = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }else {
        next();
    }
}
module.exports = authorize;