const mongoose = require('mongoose')

const userSchema = require('./user').userSchema 
const bookSchema = require('./book').bookSchema 

const listSchema = new mongoose.Schema({
    name : {type: String, required : true, unique: true},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    // desscription !
},{timestamps: true})
const List = mongoose.model('List', listSchema)
module.exports.listSchema = listSchema
module.exports.List = List;