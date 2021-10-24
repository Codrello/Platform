const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../model/Users")
const Admins = require("../model/admins")
const Video = require("../model/Video")
const Contract = require("../model/Contract")
const moment = require("moment");
const Data = moment().format('YYYY.MM.DD/h:mm:a');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require('express-validator/check');
const MdAdmin = require("../helper/MiddlewareAdmin")
const multer = require("multer");
const os = require("os");
const checkDiskSpace = require("check-disk-space").default;
const jwt = require("jsonwebtoken");
const config = require("../config");

// GET 
router.get('/', function (req, res, next) {
    res.render('admin/Adminlog');

});
router.get('/Adminreg', MdAdmin, function (req, res, next) {
    res.render('admin/Adminreg');

});
router.get('/Addvid', MdAdmin, function (req, res, next) {
    const admin = req.user;
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            Admins.find({}, (err, Admin) => {
                if (err) {

                }
                res.render('admin/Addvid', { data, admin, Admin, title: "Addvid" });
            })
        }

    })


});
router.get('/Lessons', MdAdmin, function (req, res, next) {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            Admins.find({}, (err, Admin) => {
                if (err) {
                    console.log(err);
                }
                Video.find({}, (err, video) => {
                    if (err) {
                        console.log(err);
                    }
                    const admin = req.user;
                    res.render('admin/Lessons', { data, admin, Admin, video, title: "Lessons" });
                })
            })

        }

    })


});
router.get('/dashboard', MdAdmin, function (req, res, next) {
    const admin = req.user;
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            Admins.find({}, (err, Admin) => {
                if (err) {

                }
                Video.find({}, (err, video) => {
                    if (err) {
                        console.log(err);
                    }
                    const admin = req.user;
                    // checkDiskSpace('D:').then((diskSpace) => {
                    //     // {
                    //     //     diskPath: 'D:',
                    //     //     free: 12345678,
                    //     //     size: 98756432
                    //     // }
                    //     // Note: `free` and `size` are in bytes
                    //     const memory = diskSpace;
                    //     console.log(memory)


                    // })
                    res.render('admin/dashboard', { data, admin, Admin, video, title: "dashboard" });

                })

            })
        }

    })

});
router.get('/Userinf', MdAdmin, function (req, res, next) {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            Admins.find({}, (err, Admin) => {
                const admin = req.user;
                if (err) {
                    console.log(err);

                }

                res.render('admin/Userinf', { data, admin, Admin, title: "Userinf" });
            })
        }

    })

});
router.get('/Admininf', MdAdmin, function (req, res, next) {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            Admins.find({}, (err, Admin) => {
                const admin = req.user;
                if (err) {
                    console.log(err);

                }

                res.render('admin/Admininf', { data, admin, Admin, title: "Admininf" });
            })
        }

    })

});
// router.get('/Contract', MdAdmin, function (req, res, next) {
//     Admins.find({}, (err, Admin) => {
//         if (err) {
//             console.log(err);

//         }

//         Contract.find({}, (err, contr) => {
//             const admin = req.user;
//             if (err) {
//                 console.log(err);

//             }
//             else{
//             contr.forEach(contra => {
//                 User.find({_id: contra.Userid}, (err, users) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         // console.log(users)
//                         users.forEach(data => {
//                             console.log(data)
//                             res.render('admin/Contract', { data, admin, Admin, contr, title: "Contract" });
//                         });
//                     }
    
//                 })
//             })}

//         })
//     })

// });

// POST

// router.post('/',

//   passport.authenticate("Admin", { session: false }),
//   function (req, res) {
//     const user = req.user;
//     if (res.status !== 401) {
//       const body = { _id: user._id, username: user.username };
//       const payload = {user: body};
//       const token = jwt.sign(payload, config.secret_key, {
//         expiresIn: 86400
//         //86400 bir kungi vaqt sikunda
//       })
//       res.json({user, token: token, success: true});
//     }
//     else if (res.status(401) == 401) {
//       res.json({ message: { success: false } });
//     }

//   },
// );


router.post('/', function (req, res, next) {

    passport.authenticate("Admin", {
        successRedirect: "/admin/dashboard",
        failureRedirect: "/admin/",
        failureFlash: true
    })(req, res, next)

});

const multerConf = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, './public/images/imgadmin/upload');
        },
        filename: function (req, file, next) {
            next(null, Date.now() + path.extname(file.originalname))
        },

    })

};



router.post('/Adminreg', multer(multerConf).single("file", { maxCount: 1 }), function (req, res, next) {

    const username = req.body.AdminName;
    const Email = req.body.AdminEmail;
    const password = req.body.AdminPass;
    const file = req.body.file;

    req.checkBody('AdminName', `Isim kriritishingz kerak`).notEmpty();
    req.checkBody('AdminEmail', `Eamil kriritishingz kerak`).notEmpty();
    req.checkBody('AdminPass', `Parol ismini kriritishingz kerak`).notEmpty();
    // req.checkBody('file', `Rasm kriritishingz kerak`).notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/Adminreg', {
            errors: errors
        })
    }
    else {
        // console.log(req.file)
        const path = "/images/imgadmin/upload\\" + req.file.filename
        const Admin = new Admins({
            username: username,
            Email: Email,
            password: password,
            AdminImg: path,
            type: "Admin",
            Date: Data
        });

        bcrypt.genSalt(10, (err, pass) => {
            bcrypt.hash(Admin.password, pass, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                Admin.password = hash;
                Admin.save((err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    req.flash('success', `Registrasiyadan otingiz`);
                    res.redirect("/admin/");
                    console.log(data);
                })
            })
        })




    }

});

const VideoUpl = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, './public/videos/upload');
        },
        filename: function (req, file, next) {
            next(null, Date.now() + path.extname(file.originalname))
        },

    })

};



router.post('/AddLessons', multer(VideoUpl).single("file", { maxCount: 1 }), function (req, res, next) {

    const path = "/videos/upload\\" + req.file.filename

    const Videos = new Video({
        Subject: req.body.Mavzu,
        Goal: req.body.Maqsad,
        Lesson: path,
        Date: Data,
    })
    Videos.save((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/Lessons');
            console.log(data);

        }


    })

    // elements.forEach(video => {
    //     res.render('admin/Lessons', {video});
    // })
});

router.post('/Contract/:id', function (req, res, next) {
    const token = req.params.id;
  
    const addToken = {
      token,
    }
    const quer = { _id: req.params.id };
    User.findByIdAndUpdate(quer, addToken, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        res.redirect("/admin/Contract");
      }
    })
});




module.exports = router;