var configValues = require('./config');

module.exports = {
  getDbConnectionString : function () {
    return 'mongodb://' + configValues.uname + ': ' + configValues.pwd + '@ds011790.mlab.com:11790/nodetodo'
  }
}
