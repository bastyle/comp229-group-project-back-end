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
        }).limit(1).exec().then((userObj)=>{
            if(userObj.length == 0){
                reject("err: user does not found: "+userData.userName);
            }else{
                resolve(userObj);
            }
        }).catch((e)=>{
            console.error(e);
        });
    });
}