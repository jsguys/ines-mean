var driver = function () {
    var _model = '';

    return {
        ACTIONS: {
            CREATE: 0,
            READ: 1,
            UPDATE: 2,
            DELETE: 3
        },

        getModel: function () {
            return _model;
        },

        setModel: function (entity) {
            _model = entity.getModel();
        },

        connect: function (host, port, username, password, database) {
            console.log('[aDbDriver] connect to database [not implemented yet]');
        },

        disconnect: function () {
            console.log('[aDbDriver] disconnect from database [not implemented yet]');
        },

        create: function (data, callback) {
            console.log('[aDbDriver] create data [not implemented yet]');
        },

        read: function (data, callback) {
            console.log('[aDbDriver] read data [not implemented yet]');
        },

        update: function (data, callback) {
            console.log('[aDbDriver] update data [not implemented yet]');
        },

        delete: function (data, callback) {
            console.log('[aDbDriver] delete data [not implemented yet]');
        },

        crud: function (action, data, callback) {
            switch (action) {
                case this.ACTIONS.CREATE:
                    this.create(data, callback);
                    break;

                case this.ACTIONS.READ:
                    this.read(data, callback);
                    break;

                case this.ACTIONS.UPDATE:
                    this.update(data, callback);
                    break;

                case this.ACTIONS.DELETE:
                    this.delete(data, callback);
                    break;
            }
        }
    };
};

module.exports = driver;
