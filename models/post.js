const mongoose = require('mongoose')

const userSchema = require('./user').userSchema 

const postSchema = new mongoose.Schema({
    title : {type: String, required : true, unique: true},
    content: String,
    publishedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{timestamps: true})


const Post = mongoose.model('Post', PostSchema)
module.exports.postSchema = postSchema
module.exports.Post = Post;
