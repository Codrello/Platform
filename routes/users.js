const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../model/Users")
const Contract = require("../model/Contract")
const moment = require("moment");
const Data = moment().format('YYYY.MM.DD/h:mm:a');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require('express-validator/check');
const multer = require("multer");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Login = require("../helper/Middleware")


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
router.get('/UpdInf', Login, function (req, res, next) {
  const user = req.user;
  res.render("Update", { user });
});
router.get('/restore', function (req, res, next) {

  res.render("restore");

});

router.get('/contr', function (req, res, next) {
  const user = req.user;
  console.log(user)
  res.render("contr", { user });

});

/* POST users listing. */
router.post('/Log',

  passport.authenticate("User", { session: false }),
  function (req, res) {
    const user = req.user;
    if (res.status !== 401) {
      const body = { _id: user._id, username: user.username };
      const payload = { user: body };
      const token = jwt.sign(payload, config.secret_key, {
        expiresIn: 86400
        //86400 bir kungi vaqt sikunda
      })
      res.json({user, token});
    }
    else if (res.status(401) == 401) {
      res.json({ message: { success: false } });
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
        res.json({ message: "Email adresingiz bizning serverda topilmadi borib qaytatdan registratsiyadan o'ting" });
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

  /* POST users listing  multer(Userupload).single("file", {maxCount: 1}),  */
router.post('/Reg', function (req, res, next) {
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
    res.status(400).json({
      errors: errors,
      success: false,
      status: 400
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
      token: "",
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
          } else {
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
  res.json({ success: true })
})

router.post('/UpdInf/:id', function (req, res, next) {
  const Surname = req.body.UpdSurname;
  const name = req.body.Updname;
  const FatherName = req.body.UpdFathname;
  const DateBirth = req.body.UpddateBirth;
  const Region = req.body.UpdHudud;
  const District = req.body.UpdTuman;
  const Jinsi = req.body.UpdSex;
  const Email = req.body.Updemail;
  const Workph = req.body.Updwkphone;
  const Homeph = req.body.Updmlphone;

  const foremUpd = {
    Surname,
    name,
    FatherName,
    DateBirth,
    Region,
    District,
    Jinsi,
    Email,
    Workph,
    Homeph
  }
  const quer = { _id: req.params.id };
  User.findByIdAndUpdate(quer, foremUpd, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
      // console.log(doc);
    }
  })
});

const ContractUpl = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      next(null, './public/images/Contractimg/upload');
    },
    filename: function (req, file, next) {
      next(null, Date.now() + path.extname(file.originalname))
    },

  })
};



router.post('/contr/:id', multer(ContractUpl).single("file", { maxCount: 1 }), function (req, res, next) {
  const user = req.user;
  const path = "/images/Contractimg/upload\\" + req.file.filename;
  console.log(path)
  const Contracts = new Contract({
    Userid: req.params.id,
    Cardholder: req.body.contrKr,
    ContractImg: path,
    Date: Data
  });
  Contracts.save((err, cont) => {
    if(err){
      console.log(err);
    }
    console.log(cont);
    res.send("Admin qoshishini kuting");

  })


});


module.exports = router;
