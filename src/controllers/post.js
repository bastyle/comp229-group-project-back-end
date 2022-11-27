let express = require('express');
let router = express.Router();

let Post = require('../models/post');

//  Display All Posts - READ OPERATION
module.exports.displayPostList = (req, res, next) => {
    console.log("controller::displayPostList");
    Post.find((err, postList) => {
        //console.log("err..."+err)
        if(err) {            
            return console.error(err);
        } else {
            console.log("postList..."+postList);
            res.status(200).send(postList);
        }
    });
}


module.exports.getPost = (req, res, next) => {
    let id = req.params.id;
    console.log("controller::getPost id: "+id);
    Post.findById(id, (err, postToEdit) => {
        console.log("err..."+err);
        if(err) {
            return console.error(err);
        } else {
            console.log("postList..."+postToEdit);
            res.status(200).send(postToEdit);
        }
    });
}


//  Add New Post - CREATE OPERATION
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

//  Edit Existing Post - UPDATE OPERATION
module.exports.editPost = (req, res, next) => {
    let id = req.params.id;

    let updatedPost = Post({
        "_id": id,
        "title": req.body.title,
        "publisher": req.body.publisher,
        "content": req.body.content,        
        "updated": new Date()
    });

    Post.updateOne({_id: id}, updatedPost, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.status(200).json({success: true, msg: 'Successfully Edited Existing Post'})
        }
    });
}

//  Delete Existing Post - DELETE OPERATION
module.exports.deletePost = (req, res, next) => {
    console.log("deleting: "+req.params.id);
    let id = req.params.id;

    Post.findByIdAndRemove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.status(200).json({success: true, msg: 'Successfully Deleted Book'});
        }
    });
}
