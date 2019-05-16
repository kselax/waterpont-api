const express = require('express')
const router = express.Router()

const AwsDB = require('../app/AwsDB')



// return user by parameters
router.get('/api/v1/users/', (req, res, next) => {
  var table = "clients"

  var params = {
    TableName: table,
  }

  AwsDB.docClient.scan(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err, null, 2))
    } else {
      res.send(JSON.stringify(data, null, 2))
    }
  })
})




// ===== create a new user =====
router.post('/api/v1/users/', (req, res, next) => {
  var table = "clients"

  var login = req.body.login
  var pass = req.body.pass

  var params = {
    TableName: table,
    Item: {
      "login": login,
      "pass": pass,
      "devices": {
        zones: {}
      }
    }
  }

  AwsDB.docClient.put(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      res.send(JSON.stringify(data))
    }
  })
})




// ===== get the user by id =====
router.get('/api/v1/users/:login/', (req, res, next) => {
  var table = "clients"

  var login = req.params.login

  var params = {
    TableName: table,
    Key: {
      "login": login
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



// ===== update the user by id =====
router.put('/api/v1/users/:login/', (req, res, next) => {
  var table = "clients"

  var login = req.params.login
  var pass = req.body.pass

  var params = {
    TableName: table,
    Key: {
      "login": login
    },
    UpdateExpression: "set pass = :p",
    ExpressionAttributeValues: {
      ":p": pass
    },
    ReturnValues: "UPDATED_NEW"
  }

  AwsDB.docClient.update(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      res.send(JSON.stringify(data))
    }
  })
})




// ===== delete a user by id =====
router.delete('/api/v1/users/:login/', (req, res, next) => {
  var table = "clients"

  var login = req.params.login

  var params = {
    TableName: table,
    Key: {
      "login": login
    }
  }

  AwsDB.docClient.delete(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err))
    } else {
      res.send(JSON.stringify(data))
    }
  })
})

module.exports = router 