const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Config = require('config')

/* POST login. */
router.post('/login', (req, res, next) => {
  console.log('req.query = ', req.query);
  console.log('req.body = ', req.body);
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('here we are2 user = ', user);
    console.log('info = ', info);

    if (err || !user) {
      console.log('err = ', err);
      return res.status(400).json({
        message: 'Something is not right',
        info: info,
        user: user,
        err: err
      })      
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        res.json(err)
      }

      // generate a signed json web token with the contents of user object and return it in the response
      const { id, login } = user.Items[0]

      const token = jwt.sign({ id, login }, Config.JWT.jwt_secret)
      return  res.json({ user: { id, login }, token })
    })
  })(req, res)
})

module.exports = router