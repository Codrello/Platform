const Passport = require("../passport/passport");
const jwt = require("jsonwebtoken");
const config = require('../config');

const Login = (req, res, next) => {
    const user = req.user;
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token) {
        jwt.verify(token, config.secret_key, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: "token yoq yoki token vaqti tugagan" })
            }
            req.decoded = decoded;
            
            next()
        })
    } else {
        res.json({ success: false, message: "token yoq yoki token vaqti tugagan" })
    }

}


module.exports = Login;