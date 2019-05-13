const express = require('express');
const app = express();
require('dotenv').config();
//get port 
const port = process.env.PORT
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose')
// get routs 
const bookRouts = require('./routes/books');

mongoose.connect('mongodb://localhost/books', {useNewUrlParser : false})
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) )

app.use(require('cors')())
//
app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);

//true for embaded ojects in schema/db 
app.use(express.urlencoded({extended:true}));
//post man instad of ejs
app.use(express.json())

app.use(express.static('public'));
app.use(methodOverride('_method'));
//use routs 
app.use('/books', bookRouts);


app.get('/', (req, res)=>{
  //res.status(200).json({ books: "books" })
  res.json({ todos: "tods" })

    //res.send('Hello world');
  });
  
  app.get('/somedata', (req, res) => {
    res.json({ todos: "here is your information" })

    //res.send('here is your information');
});
  // listener 

app.listen(port, ()=> {
    console.log("I am listening for requests!!!"+ port);
  });