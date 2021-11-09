const express = require('express');
const router = express.Router();
const Login = require("../helper/Middleware")
const Allvid = require("../helper/AllvidMiddleware")
const Passport = require("../passport/passport")
const User = require("../model/Users")
const Video = require("../model/Video")
const Test = require("../model/Tests")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/list', Login, function (req, res, next) {

  // const user = req.user;
  // const token = req.token
  const decod = req.decoded.user._id
  // console.log(decod)
  User.findById(decod, (err, user) => {
    if (err) {
      console.log(err)

    }
    res.json({ user });

  })
  // res.render("list", {user})
});
router.get('/vidInf', function (req, res, next) {

  const user = req.user;
  Video.find({}, (err, videos) => {
    if (err) {
      console.log(err)

    }
    res.json({ videos });

  })
});
router.get('/Allvid', Allvid, function (req, res, next) {

  const user = req.user;

  res.send("Hamma videolar");
  // res.render("list", {user})
});
router.get('/Sertificat', function (req, res, next) {

  // const user = req.user;
  
  res.render("Sertificat")
});
router.get('/AllTests', function (req, res, next) {
  Test.find((err,tests) => {
    if(err){
      res.json(err);
    }
    console.log(tests)
    res.json(tests);
  })
  
});




module.exports = router;
