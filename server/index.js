const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'] 
  }
});

io.on('connection', (socket) => {
  console.log('Client connected: ', socket.id);

  socket.emit('notification', { message: 'Bem-vindo ao servidor WebSocket!' });

  setInterval(() => {
    io.emit('notification', { message: 'Nova notificação!' });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
