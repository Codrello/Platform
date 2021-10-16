const Passport = require("../passport/passport");

const MdAdmin = (req, res, next) => {
    const admin = req.user;
    // const cook = req.headers.cookie;

    if (admin.type == "Admin") {
        next();  
    }else {
        res.redirect("/admin/");
    }
}


module.exports = MdAdmin;