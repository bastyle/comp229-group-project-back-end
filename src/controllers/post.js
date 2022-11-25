let express = require('express');
let router = express.Router();

let Post = require('../models/post');


module.exports.displayPostList = (req, res, next) => {
    console.log("controller::displayPostList");
    Post.find((err, postList) => {
        console.log("err..."+err)
        if(err) {            
            return console.error(err);
        } else {
            console.log("postList..."+postList);
            res.status(200).send(postList);
            //res.json(postList);
        }
    });
}