const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../model/Users")
const Admins = require("../model/admins")
const Video = require("../model/Video")
const moment = require("moment");
const Data = moment().format('YYYY.MM.DD/h:mm:a');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require('express-validator/check');
const MdAdmin = require("../helper/MiddlewareAdmin")
const multer = require("multer");

// GET 
router.get('/', function (req, res, next) {
    res.render('admin/Adminlog');

});
router.get('/Adminreg', MdAdmin,function (req, res, next) {
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



module.exports = router;