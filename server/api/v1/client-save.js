const AwsDB = require("../../lib/AwsDB");

module.exports = {
    run: function(req, res, _data) {
        return new Promise((resolve, reject) => {
            let params = {
                TableName: "clients",
                Item: _data
            };

            AwsDB.docClient.put(params, function(err, data) {
                if (err) {
                    resolve({ error: 100, message: err.message });
                } else {
                    resolve(data);
                }
            });
        });
    }
};
