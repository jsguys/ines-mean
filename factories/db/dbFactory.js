module.exports = {
  getDriver: function (driver, callback) {
    var fs = require('fs');
    var path = require('path');

    var appPath = require.main.filename;
    appPath = appPath.substr(0, appPath.lastIndexOf(path.sep));
    var driverPath = path.join(appPath, '/drivers/db/', driver);

    fs.exists(driverPath +'.js', function (exists) {
        if (exists) {
            callback(require(driverPath));
        }
        else {
            console.log('Database driver ' + driver + ' is not implemented yet!');
        }
    });
  }
};
