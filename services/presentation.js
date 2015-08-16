var http = require('http');

var appConfig = require('../config/app.js');

module.exports = {
  _order: null,
  _page: null,
  _pending: {},
  _presentation: null,

  getPresentation: function (callback) {
    this._getProperty(this._presentation, 'presentation', callback);
  },

  getPage: function (callback) {
    var self = this;

    if (null === self._order) {
      self.getPresentation(function (presentation) {
        if (presentation) {
          self._order = presentation.orderId;

          self._getProperty(self._page, [ 'page', '_id', self._order.pageId ], callback);
        }
      });
    }
    else {
      self._getProperty(self._page, [ 'page', '_id', self._order.pageId ], callback);
    }
  },

  _getProperty: function (property, type, callback) {
    var self = this;

    if (null === property) {
      self._retrieveDataSet(type, function (dataSet) {
        property = dataSet;
        callback(property);
      });
    }
    else {
      callback(property);
    }
  },

  _retrieveDataSet: function (type, callback) {
    var self = this;

    if ('object' === typeof type) {
      type = type.join('/');
    }

    self._register(type, callback);

    if (1 === self._pending[type].length) {
      self._sendRequest(type);
    }
  },

  _sendRequest: function (type) {
    var self = this;

    http.get('http://127.0.0.1:' + appConfig.port + '/api/' + type + '/r',
      function(res) {
        var json = '';
        
        res.on('data', function(data) {
          json += data;
        });

        res.on('end', function() {
          json = JSON.parse(json);

          if (json.success) {
            json = (undefined !== json.data[0]) ? json.data[0] : json.data;
            self._notify(type, json);
          } else {
            self._notify(type);
          }
        });
      }
    ).on('error', function (error) {
      self._notify(type);
    });
  },

  _register: function(type, callback) {
    var self = this;

    self._pending[type] = self._pending[type] || [];

    self._pending[type].push(callback);
  },

  _notify: function(type, dataSet) {
    var self = this;

    while (0 < self._pending[type].length) {
      self._pending[type].shift()(dataSet);
    }

    delete self._pending[type];
  }
};
