const Passport = require("../passport/passport");


const Allvid = (req, res, next) => {
    const user = req.user;
    // console.log(user);
    if(user){

        if(user.token == ""){
            res.send("Token yoq borib sotib oling")
        }
        else if(!user.token){
            res.send("Token yoq borib sotib oling")
        }
        else{
            next();
        }

    }else{
        res.send("User kemadi yo'q")
    }

}


module.exports = Allvid;