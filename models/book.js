const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = require('./user').userSchema 

const genreSchema = new Schema({
    name : String
   })
   
const bookSchema = new Schema({
    title : {type: String, required : true, unique: true},
    auther:String,
    year: {type: Number , maxlength: 4},
    image: String,
    ageRange: String,
    publishedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rate: [{userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, Rate:{type: Number, required : true}}],
},{timestamps: true})


const Book = mongoose.model('Book', bookSchema)
module.exports.bookSchema = bookSchema
module.exports.Book = Book;
