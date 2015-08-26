var http = require('http');
var path = require('path');
var appConfig = require('../config/app.js');

module.exports = {
  _order: null,
  _page: null,
  _pending: {},
  _presentation: null,
  _numberOfPages: 0,
  _current: 0,

  getPresentation: function (callback) {
    this._getProperty('presentation', callback);
  },

  getPage: function (callback) {
    var self = this;
    if (null === self._page) {
      self.getPresentation(function (presentation) {
        if (presentation) {
          presentation.currentOrderId = presentation.currentOrderId || presentation.startOrderId._id;
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
      callback(self._page, self._current);
    }
  },

  updatePage: function (type) {
    var self = this;

    switch (type) {
      case 'next':
        if (null !== self._order && null !== self._order.successor) {
          self._presentation.currentOrderId = self._order.successor;
          self._current++;
        }
        break;

      case 'previous':
        if (null !== self._order && null !== self._order.predecessor) {
          self._presentation.currentOrderId = self._order.predecessor;
          self._current--;
        }
        break;

      default:
        break;
    }

    self._order = null;
    self._page = null;
  },

  getNumberOfPages: function (callback) {
    var self = this;

    self._orderExists(self._presentation.startOrderId._id, 0, callback);
  },

  _orderExists: function (orderId, count, callback) {
    var self = this;

    self._getProperty([ 'order', '_id', orderId], function (data) {
      if (null !== data.successor && orderId !== data.successor) {
        self._orderExists(data.successor, ++count, callback);
      }
      else {
        return callback(count);
      }
    }, false, true);
  },

  _getProperty: function (type, callback, recursive, reset) {
    var self = this;

    if (undefined === recursive) {
      recursive = true;
    }

    var property = type;

    if ('object' === typeof type) {
      property = property[0];
    }
    property = '_' + property;

    if (reset) {
      self[property] = null;
    }

    if (null === self[property]) {
      self._retrieveDataSet(type, function (dataSet) {
        self[property] = dataSet;
        callback(self[property], self._current);
      }, recursive);
    }
    else {
      callback(self[property], self._current);
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

  _sendRequest: function (type, recursive, filter) {
    var self = this;
    var reqUrl = [
      'http://127.0.0.1:' + appConfig.port,
      'api',
      type
    ];

    if ('object' === typeof filter && filter.hasOwnProperty('key') && filter.hasOwnProperty('value')) {
      reqUrl.push(filter.key, filter.value);
    }

    if (recursive) {
      reqUrl.push('r');
    }

    http.get(reqUrl.join('/'),
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
