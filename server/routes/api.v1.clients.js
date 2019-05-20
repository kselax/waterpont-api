const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Config = require('config')

const AwsDB = require('../app/AwsDB')




// Add/Update a client
router.post('/save', (req, res, next) => {
  if (req.user.id !== Config.ADMIN.id && req.user.login !== Config.ADMIN.login) {
    return res.json({ error: "a user isn't admin"})
  }

  if (!req.body.pass) {
    return res.json({ error: "a pass field should be passed" })
  }

  if (!req.body.login) {
    return res.json({ error: "a login field should be passed" })
  }

  bcrypt.hash(req.body.pass, Config.BCRYPT.saltRounds).then(hash => {
    // Store hash in your DB
    req.body.pass = hash
    var params = {
      TableName: 'clients',
      Item: req.body
    }
    AwsDB.docClient.put(params, function(err, data) {
      if (err) {
        res.json(err)
      } else {
        res.json({ error: null })
      }
    })
  })

  
})

// Return all clients
router.post('/all', (req, res, next) => {
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
router.post('/:id', (req, res, next) => {
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