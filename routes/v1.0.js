const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log('req.body = ', req.body);
  console.log(req.body.c);
  res.send(JSON.stringify(req.body))
})

module.exports = router