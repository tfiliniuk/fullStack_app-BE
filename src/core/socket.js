import socket from 'socket.io';
import http from 'http';

export default (http) => {
  const io = socket(http);

  io.on('connection', function(socket) {
    socket.on('DIALOGS:JOIN', (dialogId) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on('DIALOGS:TYPING', (obj) => {
      socket.broadcast.emit('DIALOGS:TYPING', obj);
    });
  });

  return io;
};
