var http = require('http');

var appConfig = require('../config/app.js');

module.exports = {
  _order: null,
  _page: null,
  _pending: {},
  _presentation: null,

  getPresentation: function (callback) {
    this._getProperty('presentation', callback);
  },

  getPage: function (callback) {
    var self = this;

    if (null === self._page) {
      self.getPresentation(function (presentation) {
        if (presentation) {
          presentation.currentOrderId = presentation.currentOrderId || presentation.startOrderId;

          if (null === self._order) {
            self._getProperty([ 'order', '_id', presentation.currentOrderId ], function (order) {
              if (order) {
                self._getProperty([ 'page', '_id', order.pageId ], callback);
              }
            }, false);
          }

          
        }
      });
    }
    else {
      callback(self._page);
    }
  },

  updatePage: function (type) {
    var self = this;

    switch (type) {
      case 'next':
        if (null !== self._order.successor) {
          self._presentation.currentOrderId = self._order.successor;
        }
        break;

      case 'previous':
        if (null !== self._order.predecessor) {
          self._presentation.currentOrderId = self._order.predecessor;
        }
        break;

      default:
        break;
    }

    self._order = null;
    self._page = null;
  },

  _getProperty: function (type, callback, recursive) {
    var self = this;

    if (undefined === recursive) {
      recursive = true;
    }

    var property = type;
    if ('object' === typeof type) {
      property = property[0];
    }
    property = '_' + property;

    if (null === self[property]) {
      self._retrieveDataSet(type, function (dataSet) {
        self[property] = dataSet;
        callback(self[property]);
      }, recursive);
    }
    else {
      callback(self[property]);
    }
  },

  _retrieveDataSet: function (type, callback, recursive) {
    var self = this;

    if ('object' === typeof type) {
      type = type.join('/');
    }

    self._register(type, callback);

    if (1 === self._pending[type].length) {
      self._sendRequest(type, recursive);
    }
  },

  _sendRequest: function (type, recursive) {
    var self = this;

    http.get('http://127.0.0.1:' + appConfig.port + '/api/' + type + (recursive ? '/r' : ''),
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
