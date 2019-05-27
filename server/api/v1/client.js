const AwsDB = require("../../lib/AwsDB");

module.exports = {
    run: function(req, res, _data) {
        return new Promise((resolve, reject) => {
            AwsDB.docClient.get({ TableName: "clients", Key: { id: _data.id } }, function(err, data) {
                if (err) {
                    resolve({ error: 100, message: err.message });
                } else {
                    resolve(data);
                }
            });
        });
    }
};
