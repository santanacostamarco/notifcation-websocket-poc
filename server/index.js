const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const baseMessages = require('./base-messages')
const {v4: uuid} = require('uuid')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'] 
  }
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

io.on('connection', (socket) => {
  console.log('Client connected: ', socket.id);

  setInterval(() => {
    const messageIndex = getRandomInt(0, baseMessages.length)
    const message = baseMessages[messageIndex]
    io.emit('notification', { id: uuid(), message: message, created_at: new Date() });
  }, 60 * 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
