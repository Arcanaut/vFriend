//We need our server to have sessions for login functionality
const path = require('path');
//Requiring express(session && handlebars)
const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
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
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
  

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
