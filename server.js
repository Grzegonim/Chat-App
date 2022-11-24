const express = require('express');
const path = require('path');
const socket = require('socket.io');

app = express();
app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
const users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is working on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => { 
      console.log('Oh, I\'ve got something from ' + socket.id) 
      messages.push(message);
      socket.broadcast.emit('message', message);
    });
    
    socket.on('login', (user) => {
      users.push({ user, id: socket.id });
      socket.broadcast.emit('logAlert', { user, status: 'connected' });
      console.log('active users', user);
    });

    socket.on('disconnect', () => { 
      const userIndex = users.findIndex((user) => user.id === socket.id);
      let userName = '' 
      users.map(conUser => {if(conUser.id === socket.id){ userName = conUser.user}});
      users.splice(userIndex, 1);
      socket.broadcast.emit('logAlert', { user: userName , status: 'disconnected' });
      console.log('Oh, socket ' + socket.id + ' has left') });
      console.log('I\'ve added a listener on message and disconnect events \n');
  });