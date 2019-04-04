const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log('req.query = ', req.query);
  res.send('hello world3!')
})

module.exports = router