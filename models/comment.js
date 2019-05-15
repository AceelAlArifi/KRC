const mongoose = require('mongoose')

const userSchema = require('./User').userSchema 

const commentSchema = new mongoose.Schema({
    content : {type: String, required : true, maxlength: 500 },
    writtenBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{timestamps: true})
const Comment = mongoose.model('Comment', commentSchema)
module.exports.commentSchema = commentSchema
module.exports.Comment = Comment;
