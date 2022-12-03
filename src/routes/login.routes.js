let express = require('express');
let router = express.Router();
//const app = exp();
const cors = require("cors");



let userController = require('./../controllers/user');


/*router.post("/api/login", function (req, res) {
    userController.checkUser(req.body).then((userObj) => {
        console.log("user: " + userObj);
        var payload = {
            userName: userObj.userName,
            fullName: userObj.fullName,
            role: userObj.role
        }
        var token = jwt.sign(payload, jwt_obj.secretOrKey);

        res.json({ msg: "login successfully", token: token });
    }).catch((e) => {
        console.error("err: " + e);
        res.status(404).end();
    });
});*/

router.post('/add', userController.checkUser);

module.exports = router;