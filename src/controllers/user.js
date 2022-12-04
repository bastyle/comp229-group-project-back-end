const mongoose = require("mongoose")

let DB = require('../config/database');



/*let Schema = mongoose.Schema;
let userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    fullName: String,
    email: String
});

module.exports.connect = function () {
    return new Promise(function (resolve, reject) {
        //mongoose.connect(process.env.URI || DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
        let mongoDB = mongoose.connection;
        mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
        mongoDB.once('open', () => {
            console.log("Connected to MongoDB...");
            User = mongoDB.model("users", userSchema)
            resolve();
        });
    })
}*/

//let User = require('../models/user');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.find({
            userName: userData.userName,
            password: userData.password
        }).limit(1).exec().then((userObj) => {
            if (userObj.length == 0) {
                reject("err: user does not found: " + userData.userName);
            } else {
                resolve(userObj);
            }
        }).catch((e) => {
            console.error(e);
        });
    });
}
//
module.exports.getUsers = (req, res, next) => {
    console.log("controller::getUsers");
    User.find((err, userList) => {
        //console.log("err..."+err)
        if(err) {            
            return console.error(err);
        } else {
            //console.log("postList..."+postList);
            res.status(200).send(userList);
        }
    });
}
//
module.exports.getUserById = (req, res, next) => {
    let id = req.params.id;
    console.log("controller::getUserById id: " + id);
    User.findById(id, (err, userToEdit) => {
        console.log("getUserById err: " + err);
        if (err) {
            return console.error(err);
        } else {
            console.log("user to edit." + userToEdit);
            res.status(200).send(userToEdit);
        }
    });
}

module.exports.addUser = (req, res, next) => {
    let newUser = User({
        
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "fullName": req.body.fullName,
        "created": new Date(),
        "updated": new Date()
    });
    console.log("newUser"+newUser);
    User.create(newUser, (err, User) => {
        if (err) {
            console.log("error creating user: " + err);
            res.end(err);
        } else {
            res.status(201).json({ success: true, msg: 'Successfully Added New User' });
        }
    });
}


module.exports.editUser = (req, res, next) => {
    let id = req.params.id;

    let updatedUser = User({
        "_id": id,
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "fullName": req.body.fullName,
        "updated": new Date()
    });

    console.log("usr: "+JSON.stringify(updatedUser));

    /*User.updateOne({_id: id}, updatedUser, (err) => {
        if(err){
            console.log("error editing user: " + err);
            res.end(err);
        }
        else{
            res.status(200).json({success: true, msg: 'Successfully Edited Existing User'})
        }
    });*/

    User.updateOne({_id: id}, updatedUser, (err) => {
        if(err){
            console.log("error editing user: " + err);
            res.end(err);
        }
        else{
            res.status(200).json({success: true, msg: 'Successfully Edited Existing User'})
        }
    });
}