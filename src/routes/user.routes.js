let express = require('express');
let router = express.Router();
//const jwt = require("jsonwebtoken");
let passport = require('passport');

let userController = require('./../controllers/user');

router.get('/', userController.getUsers);
router.get('/:id', passport.authenticate("jwt", { session: false }), userController.getUserById);
//router.post('/add', passport.authenticate("jwt", { session: false }), userController.addUser);
router.post('/add', userController.addUser);
router.put('/edit/:id', passport.authenticate("jwt", { session: false }), userController.editUser);

module.exports = router;