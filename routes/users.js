const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../model/Users")
const moment = require("moment");
const Data = moment().format('YYYY.MM.DD/h:mm:a');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require('express-validator/check');
const multer = require("multer");


/* GET users listing. */
router.get('/Reg', function (req, res, next) {
  res.render("Register");
});
router.get('/Log', function (req, res, next) {
  // const user = req.user;
  // if(success == true){
  //   res.json(user)
  // }else if(success == false){
  //   res.json("ishlamadi")
  // }
  res.render("Login");
});
router.get('/UpdInf', function (req, res, next) {
  const user = req.user;
  res.render("Update", { user });
});
router.get('/restore', function (req, res, next) {

  res.render("restore");

});


/* POST users listing. */
router.post('/Log',
 
  passport.authenticate("User"),
  function(req, res) {
    const user = req.user;
    if(res.status !== 401){
      res.json({user, success: true});
    }
    else if(res.status(401) == 401){
      res.json({message:{success: false}});
    }
    
  },
);

/* POST users listing. */
router.post('/restore', function (req, res, next) {
  const Mail = req.body.Resmail
  User.find({ Email: Mail }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length === 0) {
        res.json({message:"Email adresingiz bizning serverda topilmadi borib qaytatdan registratsiyadan o'ting"});
        console.log(data);
      } else {
        data.forEach(elem => {
          // res.render("emailTk", {elem});
          res.json(elem);
          console.log(data);
        })
      }
    }
  })
});


router.post('/Edit/:id', function (req, res, next) {
  const username = req.body.LgUpe;
  let password = req.body.PassUpe;


  bcrypt.genSalt(10, (err, pass) => {
    bcrypt.hash(password, pass, (err, hash) => {
      if (err) {
        console.log(err);
      }
      password = hash;

      const foremlUpd = {
        username,
        password
      }

      const query = { _id: req.params.id };
      User.findOneAndUpdate(query, foremlUpd, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          res.json(doc._id)
        }
      })
    })
  })

});

// const Userupload = {
//   storage: multer.diskStorage({
//     destination: function (req, file, next) {
//       next(null, './public/images/userimg/upload');
//     },
//     filename: function (req, file, next) {
//       next(null, Date.now() + path.extname(file.originalname))
//     },

//   })

// };

/* POST users listing. multer(Userupload).single("file", {maxCount: 1}), const path = "/images/userimg/upload\\" + req.file.filename;  */
router.post('/Reg',  function (req, res, next) {
  const name = req.body.name;
  const Surname = req.body.Surname;
  const Fathname = req.body.Fathname;
  const dateBirth = req.body.dateBirth;
  const Login = req.body.Login;
  const Parol = req.body.Parol;
  const jshshir = req.body.jshshir;
  const Hudud = req.body.Hudud;
  const Tuman = req.body.Tuman;
  const Sex = req.body.Sex;
  const email = req.body.email;
  const wkphone = req.body.wkphone;
  const mlphone = req.body.mlphone;
  const Muassasa = req.body.Muassasa;
  const Muassasa2 = req.body.Muassasa2;
  const Bol = req.body.Bol;
  const Lavoz = req.body.Lavoz;
  const Course = req.body.Course;
  // const file = req.body.file;

  req.checkBody('Surname', `Familiyani kriritishingz kerak`).notEmpty();
  req.checkBody('name', `Ismni kriritishingz kerak`).notEmpty();
  req.checkBody('Fathname', `Otasining ismini kriritishingz kerak`).notEmpty();
  req.checkBody('dateBirth', `Tug'ilgan sanani kriritishingz kerak`).notEmpty();
  req.checkBody('Login', `Login kriritishingz kerak`).notEmpty();
  req.checkBody('Parol', `Parol kriritishingz kerak`).notEmpty();
  req.checkBody('jshshir', `JSHSHIR raqamini kriritishingz kerak`).notEmpty();
  req.checkBody('Hudud', `Tashkilotingiz joylashgan hududni kriritishingz kerak`).notEmpty();
  req.checkBody('Tuman', `Tashkilotingiz joylashgan tumani kriritishingz kerak`).notEmpty();
  req.checkBody('Sex', `Jinsini kriritishingz kerak`).notEmpty();
  req.checkBody('email', `Emailni kriritishingz kerak`).notEmpty();
  req.checkBody('wkphone', `Ish telefoni kriritishingz kerak`).notEmpty();
  req.checkBody('mlphone', `Mobil telefoni kriritishingz kerak`).notEmpty();
  req.checkBody('Muassasa', `Muassasangizni kriritishingz kerak`).notEmpty();
  req.checkBody('Muassasa2', `Muassasangizni kriritishingz kerak`).notEmpty();
  req.checkBody('Bol', `Bo'linmani kriritishingz kerak`).notEmpty();
  req.checkBody('Lavoz', `Lavozimlarni kriritishingz kerak`).notEmpty();
  req.checkBody('Course', `Kurslaringizni belgilashingiz kerak`).notEmpty();
  const errors = req.validationErrors();
  

  if (errors) {
    res.json({
      errors: errors,
      success: false
    })
  }

  else {
    const Users = new User({
      name: name,
      Surname: Surname,
      FatherName: Fathname,
      DateBirth: dateBirth,
      username: Login,
      password: Parol,
      JSHSHIR: jshshir,
      Region: Hudud,
      District: Tuman,
      Jinsi: Sex,
      Email: email,
      Workph: `+${wkphone}`,
      Homeph: `+${mlphone}`,
      Muassasasi: Muassasa,
      Muassasasi2: Muassasa2,
      Division: Bol,
      Position: Lavoz,
      Courses: Course,
      // UserImg: path,
      type: "User",
      Date: Data
    })
    bcrypt.genSalt(10, (err, pass) => {
      bcrypt.hash(Users.password, pass, (err, hash) => {
        if (err) {
          console.log(err);
        }
        Users.password = hash
        Users.save((err, data) => {
          if (err) {
            res.json(err);
          }else{
            res.json({
              data,
              success: true
            })
          }
          
        })
      })
    })


  }




});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({success: true})
})

router.post('/UpdInf/:id', function (req, res, next) {
  const Updname = req.body.UpdSurname;
  const UpdSurname = req.body.Updname;
  const UpdFathname = req.body.UpdFathname;
  const UpddateBirth = req.body.UpddateBirth;
  const UpdHudud = req.body.UpdHudud;
  const UpdTuman = req.body.UpdTuman;
  const UpdSex = req.body.UpdSex;
  const Updemail = req.body.Updemail;
  const Updwkphone = req.body.Updwkphone;
  const Updmlphone = req.body.Updmlphone;

  const foremUpd = {
    Updname,
    UpdSurname,
    UpdFathname,
    UpddateBirth,
    UpdHudud,
    UpdTuman,
    UpdSex,
    Updemail,
    Updwkphone,
    Updmlphone
  }
  const quer = { _id: req.params.id };
  User.findOneAndUpdate(quer, foremUpd, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/list");
      console.log(doc);
    }
  })
});




module.exports = router;
