var io = null;

var ROOM_AUDIENCE = 'audience';
var ROOM_REMOTE = 'remote';

var remoteKey = null;

module.exports = function (app) {
	if (null === io) {
		io = require('socket.io')(app);

		io.on('connection', function(socket){
			socket.join(ROOM_AUDIENCE);

			socket.on('hello', function (data) {
			    socket.emit('welcome', {
			        page: 0,
			        presentation: 'inespresentation'
			    });
		    });

		    // remote navigation
		    socket.on('remote', function (data) {
		    	var response = null;

		    	if (null === remoteKey) {
			    	socket.join(ROOM_REMOTE);
			    	socket.leave(ROOM_AUDIENCE);

			    	remoteKey = generateKey();

			    	response = createSuccessResponse({
			    		key: remoteKey
			    	});
			    }
			    else {
			    	response = createErrorResponse('Already connected to remote.');
			    }

			    socket.emit('remote', response);
		    });

		    socket.on('navigation', function (data) {
		    	var response = null;

		    	if (data.hasOwnProperty('key') && data.hasOwnProperty('type')) {
		    		if (remoteKey === data.key) {
		    			switch (data.type) {
		    				case 'next':
		    					io.to(ROOM_AUDIENCE).emit('next', {});
		    					break;

	    					case 'stop':
		    					io.to(ROOM_AUDIENCE).emit('stop', {});
	    						break;

    						default:
    							break;
		    			}

		    			response = createSuccessResponse({
		    				message: 'Audience updated'
		    			});
		    		}
		    		else {
		    			response = createErrorResponse('Invalid key.');
		    		}
		    	}
		    	else {
		    		response = createErrorResponse('Invalid package format.');
		    	}

		    	socket.emit('navigation', response);
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
