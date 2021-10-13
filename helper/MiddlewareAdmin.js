const Passport = require("../passport/passport");

const MdAdmin = (req, res, next) => {

    if(req.user.type == "Admin"){
        next();
    }else{
        res.redirect("/admin/");
    }
}


module.exports = MdAdmin;