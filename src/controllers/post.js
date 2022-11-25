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
        }
    });
}

module.exports.addPost = (req, res, next) => {
    let newPost = Post({
        "title": req.body.title,
        "publisher": req.body.publisher,
        "content": req.body.content,        
        "created": new Date(),
        "updated": new Date()
    });

    Post.create(newPost, (err, Post) =>{
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.status(201).json({success: true, msg: 'Successfully Added New Post'});
        }
    });
}