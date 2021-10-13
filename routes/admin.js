const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../model/Users")
const Admins = require("../model/admins")
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
router.get('/Adminreg', function (req, res, next) {
    res.render('admin/Adminreg');

});
router.get('/dashboard', function (req, res, next) {
    const admin = req.user;
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }else{
            Admins.find({}, (err, Admin) => {
                if(err){

                }
                res.render('admin/dashboard', { data, admin, Admin});
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



router.post('/Adminreg',  multer(multerConf).single("file", {maxCount: 1}), function (req, res, next) {

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





module.exports = router;