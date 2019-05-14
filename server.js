const express = require('express');
const app = express();
require('dotenv').config();
//get port 
const port = process.env.PORT
const session = require('express-session')
//jwt and passports
const jwt = require('jsonwebtoken')
const passport = require('passport')

const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose')
// get routs 
const bookRouts = require('./routes/books');
///database name and cooniction
mongoose.connect('mongodb://localhost/books', {useNewUrlParser : true})
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

//create session for passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

 app.use(passport.initialize())
 app.use(passport.session())
 
//use routs 
app.use('/books', bookRouts);
app.use('/auth', require('./routes/auth.routes'))






//cannot find route
app.use('*', (request, response) => {
  response.status(404).json({message : "Data not found!"})
 })

app.get('/', (req, res)=>{
  //res.status(200).json({ books: "books" })
  res.json({ todos: "tods" })
    //res.send('Hello world');
  });

// listener 
app.listen(port, ()=> {
    console.log("I am listening for requests!!!"+ port);
  });