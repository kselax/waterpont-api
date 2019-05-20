const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const Config = require('config')
const bcrypt = require('bcrypt')

const AwsDB = require('../app/AwsDB')


module.exports = (passport) => {

  passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('username = ', username);
      console.log('password = ', password);
      // 1. check whether it is admin
      if (Config.ADMIN.login === username) {
        bcrypt.compare(password, Config.ADMIN.pass)
        .then(res => {
          if (res) {
            done(null, {Items: [{ id: Config.ADMIN.id, login: Config.ADMIN.login }]})
            return Promise.reject('admin is logged')
          } else {
            return Promise.resolve()
          }
        })
        .then(() => {
          console.log('needs to query the database');
          checkLeftUsers()
        })
        .catch(err => {
          if (err === 'admin is logged') { 
            console.log('admin is logged');
          } else {
            console.log('err = ', err);
          }
        })
      } else {
        console.log("isn't admin");
        checkLeftUsers()
      }

      function checkLeftUsers() {
        var table = "clients"

        var params = {
          TableName: table,
          // ProjectionExpression: "#login, id",
          FilterExpression: "#login = :login",
          ExpressionAttributeNames: {
            "#login": "login"
          },
          ExpressionAttributeValues: {
            ":login": username,
          }
        }

        // console.log('here1.2');
        return AwsDB.docClient.scan(params, function(err, data) {
          if (err) {
            return done(err, false, { message: 'error is happened' })
          } else {
            // console.log('data = ', data);
            if (data.Count === 0) {
              return done(null, false, { message: 'data is empty' })
            } else {
              bcrypt.compare(password, data.Items[0].pass).then(res => {
                if (!res) {
                  return done(null, false, { message: 'pass is incorrect' })
                } else {
                  return done(null, data, { message: 'Logged In Successfully' })
                }
              })
            }
          }
        }) // scan
      }
      
    }))



  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.JWT.jwt_secret
  }, (jwtPayload, cb) => {
    // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    console.log('jwtPayload = ', jwtPayload)
    const user = jwtPayload
    return cb(null, user)
  }))
}