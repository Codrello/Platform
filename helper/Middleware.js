const Passport = require("../passport/passport");

const Login = (req, res, next) => {
    if(req.user.type == "User"){
        next()
    }else{
        res.redirect("/Log")
    }
}


module.exports = Login;