let express = require('express');
let router = express.Router();

let Post = require('../models/post');


module.exports.displayPostList = (req, res, next) => {
    console.log("controller::displayPostList");
    Post.find((err, postList) => {
        console.log("finding..."+err)
        if(err) {            
            return console.error(err);
        } else {
            console.log("postList..."+postList)
            res.json(postList);
        }
    });
}