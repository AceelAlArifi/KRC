const mongoose = require('mongoose')

const userSchema = require('./user').userSchema 

const bookSchema = new mongoose.Schema({
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
