const express = require('express')
const router = express.Router()

const AwsDB = require('../app/AwsDB')

// Add/Update a client
router.post('/api/v1/clients/save', (req, res, next) => {
  console.log("req.body = ", req.body);
  console.log('req.body = ', req.body);

  var table = "clients"

  var login = req.body.login
  var pass = req.body.pass

  var params = {
    TableName: table,
    Item: req.body
  }

  AwsDB.docClient.put(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      res.send(JSON.stringify(data))
    }
  })
})

// Return all clients
router.post('/api/v1/clients/all', (req, res, next) => {
  var table = "clients"

  var params = {
    TableName: table,
  }

  AwsDB.docClient.scan(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})



// Return a client by id
router.post('/api/v1/clients/:id', (req, res, next) => {
  var table = "clients"

  var id = req.params.id

  var params = {
    TableName: table,
    Key: {
      "id": id
    }
  }

  AwsDB.docClient.get(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err, null, 2))
    } else {
      res.send(JSON.stringify(data, null, 2))
    }
  })
})










module.exports = router 