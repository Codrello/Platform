const Passport = require("../passport/passport");

const MdAdmin = (req, res, next) => {
    const admin = req.user;
    const types = "Admin";
    // const cook = req.headers.cookie;
    // console.log(types)
    // console.log(req.session)
    // console.log(req.session.passport)
    const session = req.session.passport;
    if(admin){
        if (admin.type == types) {
            if (session !== undefined) {
                next();
            }else{
                next();
            }

        }else{
            res.redirect("/admin/");
        }
    }
    else{
        res.redirect("/admin/");
    }
}


module.exports = MdAdmin;