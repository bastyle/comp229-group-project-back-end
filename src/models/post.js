let mongoose = require('mongoose');
let Post = mongoose.Schema({
    publisher: String,
    content:String,
    title: String,
    created: Date,
    updated: Date
    },
    {
        collection: "post"
    }
);

module.exports = mongoose.model('Post', Post);