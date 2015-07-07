var driver = {
    connect: function (host, port) {
        console.log('connect to database ...');
    },

    disconnect: function (host, port) {
        console.log('disconnect from database ...')
    }
};

module.exports = driver;
