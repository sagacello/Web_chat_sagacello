const moment = require('moment');

const chatModel = require('../models/chatModel');

const document = (message, nickname, timestamp) => {
  chatModel.create(message, nickname, timestamp);
};

const historyMessage = async (socket) => {
  const history = await chatModel.getAll();
  socket.emit('history', history);
};

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', (message) => {
      document(
        message.chatMessage,
        message.nickname,
        moment().format('DD-MM-YYYY HH:mm:ss'),
      );
      io.emit(
        'message',
        `${moment().format('DD-MM-YYYY HH:mm:ss')} - ${message.nickname}: ${
          message.chatMessage
        }`,
      );
    });
    historyMessage(socket);
  });
