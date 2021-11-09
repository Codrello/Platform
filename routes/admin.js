const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../model/Users")
const Admins = require("../model/admins")
const Video = require("../model/Video")
const Test = require("../model/Tests")
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
router.get('/AddTest', MdAdmin, function (req, res, next) {
    const admin = req.user;
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            Admins.find({}, (err, Admin) => {
                if (err) {
                    console.log(err)
                }
                Test.find({}, (err, test) => {
                    if (err) {
                        console.log(err)
                    }
                    res.render('admin/AddTest', { data, admin, Admin, test, title: "AddTest" });
                })
                
            })
        }

    })


});
router.get('/EditTest/:id', MdAdmin, function (req, res, next) {
    const admin = req.user;
    Test.find({_id: req.params.id}, (err, test) => {
        if (err) {
            console.log(err)
        }
        res.render('admin/EditTest', {admin, test});
    })


});
router.get('/Delete/:id', function (req, res, next) {
    // const query = {  };
  Test.findOneAndDelete({_id: req.params.id}, (err) => {
    if (err) {
      console.log(err);
    } else {      
      res.redirect("/admin/AddTest");

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
router.get('/Contract', MdAdmin, function (req, res, next) {
    Admins.find({}, (err, Admin) => {
        if (err) {
            console.log(err);

        }

        Contract.find({}, (err, contr) => {
            if (err) {
                console.log(err);

            }
            if (contr.length === 0) {
                const admin = req.user;
                const notContr = "Shartnoma yoq"
                res.render('admin/Contract', { notContr, admin, Admin, title: "Contract" });

            }
            else {
                // contr.forEach(contra => {
                //     // console.log(contra.Userid)


                // })
                User.find({}, "token", (err, users) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const admin = req.user;
                        // console.log(users)
                        // if (users.length === 0) {
                        //     const notUsr = "User yoq"
                        //     res.render('admin/Contract', { notUsr, admin, Admin, contr, title: "Contract" });

                        // } else {

                        // }
                        res.render('admin/Contract', { users, admin, Admin, contr, title: "Contract" });


                    }

                })
            }

        })
    })

});

// POST

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

router.post('/AddTest', function (req, res, next) {
      
    const Tests = new Test({
        subject: req.body.Testmavzu,
        test: req.body.Test,
        answer: req.body.answer,
    });

    Tests.save((err,data) => {
        if(err){
            console.log(err);
        }
        // console.log(data);
        res.redirect("/admin/AddTest")
    })

});

router.post('/Edit/:id', function (req, res, next) {
    const admin = req.user;
    const subject = req.body.mavzuUpd;
    const test = req.body.TestUpd;
    const form = {
        subject,
        test
    }
    const query = {_id: req.params.id};
    Test.findByIdAndUpdate(query, form, (err, test) => {
        if (err) {
            console.log(err)
        }
        console.log(test);
        res.redirect('/admin/AddTest');
    })


});

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