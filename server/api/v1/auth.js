const Config = require('config')

module.exports = {
  run: function (req, res, _data) {
    return new Promise((resolve, reject) => {
      let result = { error: 403, message: "Not authorized!" };
      if (Config.ADMIN.login == _data.login && Config.ADMIN.pass == _data.pass) {
        result = { error: 0, result: 1 };
      }
       resolve(result);
    });
  }
}