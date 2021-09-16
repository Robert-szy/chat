const express = require('express');
const path = require('path');
const socket = require('socket.io');

const db = require('./client/db');

const app = express();
let messages = db.messages;
let users = db.users;

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  // userId = socket.id;
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);

    console.log('messages ', messages);
    console.log('message ', message);

    messages.push(message);
    
    socket.broadcast.emit('message', message);

  });

  socket.on('join', (user) => {
    console.log('Oh, I\'ve got new login form ' + socket.id);
    userId = socket.id;
    console.log('user ', user);
    users.push( {user, userId} );
    console.log('users ', users);

    socket.broadcast.emit('join', user);

  });

  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left') 
    userDicsonnectedID = socket.id
    const index = users.findIndex(v => v.userId === userDicsonnectedID);
    if (index >=0) {
    user = users[index].user;  
    users.splice(index, 1);
  
    console.log('users bez logout', users);
    if (user) {socket.broadcast.emit('logout', user)};  
    }
  });
  console.log('I\'ve added a listener on message event \n');
});
// module.exports = server;
