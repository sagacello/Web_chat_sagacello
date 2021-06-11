const usersOnline = {};

const deleteUser = (socket) => {
  if (usersOnline[socket.id]) {
    return delete usersOnline[socket.id];
  }
};

module.exports = (io) =>
  io.on('connection', (socket) => {
    usersOnline[socket.id] = socket.id.substring(4);
    io.emit('nickRandom', {
      usersOnline });
    socket.on('disconnect', () => {
      deleteUser(socket);
      io.emit('onlineUsers', {
        usersOnline,
      });
      console.log('Desconectado');
    });
    socket.on('nickname', (nickname) => {
      usersOnline[socket.id] = nickname;
      io.emit('onlineUsers', {
        usersOnline,
      });
    });
  });
