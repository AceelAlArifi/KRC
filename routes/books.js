const Book = require('../models/book').Book;

const router = require('express').Router()

//get all books  
router.get('/', (request, response)=>{
  Book.find()
  .then((books) => {
   if(books.length < 1){
    return response.json({ books : books, message : 'nothing found'})
   }
   response.status(200).json({ books : books})
  })
  .catch(err => {
   response.send({ message : err})
  })
  
})
// get one book 
router.get('/:indexOfBooksArray', (request, response) => {
   Book.findById(request.params.indexOfBooksArray)//findOneAndUpdate,
   .then((book) => {
    response.status(200).json({ book : book})
   })
   .catch(err => {
    response.send({ message : err})
   })
})
//add new book 
router.post('/', (request, response)=>{
//fet all data 
  let data = {
    title : request.body.title,
    author:request.body.author,
    year: request.body.year,
    image: request.body.image,
    ageRange: request.body.ageRange,
    //publishedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //request.body.publishedBy,
  }
  let book = new Book(data)

  book.save()
  .then(()=> {
   response.status(200).json({ book : book, message: "saved"})
  })
  .catch(err => {
      if(err.code == 11000)
      response.send({ message : "dublicated"})
      else
      response.send({ message : err})
  })
})
//edit book 
router.put('/:indexOfBooksArray', (request, response) => {
    let updatedBook = request.body
   Book.findByIdAndUpdate(request.params.indexOfBooksArray, updatedBook)//findOneAndUpdate,
      .then(() => {
          ////////////////can't get this message ! but it updated
        response.send({message: "updated"})
      }).catch(err => {
        response.send({ message : err})
    })
  })
//delete book
router.delete('/:indexOfBooksArray', (request, response) => {
    Book.findByIdAndDelete(request.params.indexOfBooksArray)
      .then(() => {
        response.send({message: "Deleted"})
          //redirect to main!
      }).catch(err => {
        response.send({ message : err})
    })
  })
module.exports = router