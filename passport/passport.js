const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const User = require('../model/Users')
const Admins = require("../model/admins")
const passport = require("passport");
const jwt = require("jsonwebtoken");
// var JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
  passport.use('User', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function (username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "Login notog'ri" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          done(null, user)
        }
        else {
          
          done(null, false, { message: `parolingiz notog'ri` })
        }
      })
    });
  }
  ));


  // var opts = {}
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // opts.secretOrKey = 'secret_passport';
  // passport.use('User', new JwtStrategy(opts, function (jwt_payload, done) {
  //   User.findOne({ username: jwt_payload }, function (err, user) {
  //     if (err) {
  //       return done(err, false);
  //     }
  //     if (user) {
  //       return done(null, user);
  //     } else {
  //       bcrypt.compare(password, user.password, (err, isMatch) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         if (isMatch) {
  //           done(null, user)
  //         }
  //         else {
  //           const payload = { username };
  //           jwt.sign(payload, req.app.get("secret_key"), {
  //             expiresIn: 180
  //           })

  //           done(null, false, { message: `parolingiz notog'ri` })
  //         }
  //       })
  //     }
  //   });
  // }));




  passport.use('Admin', new LocalStrategy({
    usernameField: 'adminnm',
    passwordField: 'adminpass'
  },
    function (username, password, done) {
      Admins.findOne({ username: username }, (err, admin) => {
        if (err) { return done(err); }
        if (!admin) {
          return done(null, false, { message: "Login notog'ri" });
        }
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            done(null, admin)
          }
          else {
            const payload = { username };
            jwt.sign(payload, req.app.get("secret_key"), {
              expiresIn: 5
            })

            done(null, false, { message: `parolingiz notog'ri` })
          }
        })
      });
    }
  ));

  passport.serializeUser(function (enity, done) {
    done(null, { id: enity.id, type: enity.type });
  });

  passport.deserializeUser(function (obj, done) {
    if (obj.type == "User") {
      User.findById(obj.id, function (err, user) {
        done(err, user);
      });
    }
    else if (obj.type == "Admin") {
      Admins.findById(obj.id, function (err, admin) {
        done(err, admin);
      });
    } else {
      done(new Error('no user type:', obj.type), null);
    }


  });

}