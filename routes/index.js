const express = require('express');
const router = express.Router();
const Login = require("../helper/Middleware")
const Passport = require("../passport/passport")
const User = require("../model/Users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/list', Login, function(req, res, next) {
  
  const user = req.user;

  res.json(user);
  // res.render("list", {user})
});

module.exports = router;
