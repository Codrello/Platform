const Passport = require("../passport/passport");

const Login = (req, res, next) => {
    const user = req.user;
    if(user.type == "User"){
        next()
    }else{
        res.redirect("/Log")
    }
}


module.exports = Login;