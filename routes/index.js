const express = require('express');
const router = express.Router();
const Login = require("../helper/Middleware")
const Allvid = require("../helper/AllvidMiddleware")
const Passport = require("../passport/passport")
const User = require("../model/Users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/list', Login, function(req, res, next) {
  
  const user = req.user;
  // const token = req.token
  const decod = req.decoded.user._id
  // console.log(decod)
  User.findById(decod,(err, dec) => {
    if(err){
  console.log(err)

    }
    res.json({dec});

  })
  // res.render("list", {user})
});
router.get('/Allvid',Allvid, function(req, res, next) {
  
  const user = req.user;

  res.send("Hamma videolar");
  // res.render("list", {user})
});




module.exports = router;
