//We need our server to have sessions for login functionality
const path = require('path');
//Requiring express(session && handlebars)
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//connecting session to sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//non npms
const routes = require('./controllers');
const sequelize = require('./config/connection');

//starting express and assigning port
const app = express();
const PORT = process.env.PORT || 3001;
//create session
var sess = {
    secret: 'Super Top secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
      }),
}
//starting session with the sess variable 
app.use(session(sess));
//initializing engine for handlebars files to be read by express
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
  

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
