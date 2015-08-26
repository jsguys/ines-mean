var presentation = require('./services/presentation.js');

var io = null;

var ROOM_AUDIENCE = 'audience';
var ROOM_REMOTE = 'remote';

var remoteKey = null;
var listeners = 0;

module.exports = function (app) {
  if (null === io) {
    io = require('socket.io')(app);

    io.on('connection', function(socket){
      socket.join(ROOM_AUDIENCE);

      listeners++;
      io.to(ROOM_AUDIENCE).emit('listeners', {
        listeners: listeners
      });

      presentation.getPresentation(function (received) {
        if (received) {
          socket.emit('presentation', received);

          presentation.getNumberOfPages(function (numberOfPages) {
            if (numberOfPages) {
              socket.emit('numberOfPages', numberOfPages);
            }

            presentation._order = null;
            presentation._page = null;

            presentation.getPage(function (page, current) {
              if (page) {
                var data = {page: page, current: current};
                socket.emit('page', data);
              }
            });
          });
        }
      });

      socket.on('remote', function (data) {
        var response = null;

        socket.join(ROOM_REMOTE);

        remoteKey = generateKey();

        socket.emit('remote', createSuccessResponse({
          key: remoteKey
        }));
      });

      socket.on('navigation', function (data) {
        var response = null;
        if (data.hasOwnProperty('type')) {
          if (false !== socket.rooms.indexOf(ROOM_REMOTE)) {
            presentation.updatePage(data.type);
            presentation.getPage(function (page, current) {
              var data = {page: page, current: current} ;
              io.to(ROOM_AUDIENCE).emit('page', data);
            });

            response = createSuccessResponse({
              message: 'Audience updated'
            });
          }
          else {
            response = createErrorResponse('You are not allowed to navigate.');
          }
        }
        else {
          response = createErrorResponse('Invalid package format.');
        }

        socket.emit('navigation', response);
      });

      socket.on('disconnect', function () {
        if (false !== socket.rooms.indexOf(ROOM_REMOTE)) {
          socket.leave(ROOM_REMOTE);
        }
        socket.leave(ROOM_AUDIENCE);

        listeners--;
        io.to(ROOM_AUDIENCE).emit('listeners', {
          listeners: listeners
        });
      });
    });
  }

  return io;
};

function generateKey () {
  var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  var key = '';

  for (var i = 0; 20 > i; i++) {
    key += charset[Math.floor(Math.random() * charset.length)];
  }

  return key;
}

function createSuccessResponse(data) {
  data = data || {};
  if ('object' !== typeof data) {
    data = {
      data: data
    };
  }
  data.success = true;

  return data;
}

function createErrorResponse(message) {
  return {
    success: false,
    message: message
  };
}
