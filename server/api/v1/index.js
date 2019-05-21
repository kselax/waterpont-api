const express = require('express')
const router = express.Router()
const Config = require('config');

/**
 * Send requests with JSON like 
 * {
 *     token: oiu3iu4o5ui4u5
 *     data: {}
 * }
 * 
 */
router.post('/:method', (req, res, next) => {
    if (!req.body.token) {
        return res.json({error:10, message: "No token"});
    }
    
    if(Config.ADMIN.token != req.body.token) {
        return res.json({error:11, message: "Wrong token"});
    }

    let _exec = require('./' + req.params.method + '.js');
    _exec.run(req, res, req.body.data).then((data) => {
        if(data.error > 0) {
            // TODO: save log of errors
            data.method = req.params.method;
            return res.json(data);
        }
        return res.json({error: 0, result: data});
    })
});

module.exports = router;