//We need our server to have sessions for login functionality
const path = require('path');
//Requiring express(session && handlebars)
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//connecting session to sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//socket.io requires
const socketio = require('socket.io');
const http = require('http');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

//non npms
const routes = require('./controllers');
const sequelize = require('./config/connection');


//starting express and assigning port
const app = express();
//passing in express to make it a socket server also
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const io = socketio(server);
const admin = 'NightBot';
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

//run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({username, room}) => {
    //the user when in chat gets a socket id from there connection This is NOT the users id from the database
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //welcome message
    socket.emit('message', formatMessage(admin,'Welcome to Chat'));
    //broadcast that someone has joined
    socket.broadcast
    .to(user.room)
    .emit('message', formatMessage(admin, `${user.username} has joined the chat`));

    //send user and room info
    io.to(user.room).emit('roomUsers', getRoomUsers(user.room));

  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  });
  //Runs on disconnect
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
      if(user){
        io.to(user.room).emit('message', formatMessage(admin, `${user.username} has left the chat`));

        //send user and room info
      io.to(user.room).emit('roomUsers', getRoomUsers(user.room));
      }
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});
