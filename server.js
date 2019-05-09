const express = require('express');

const app = express();



require('dotenv').config();
//get port 
const port = process.env.PORT

const ejs = require('ejs');

const methodOverride = require('method-override')
// const mongoose = require('mongoose')
// get routs 


// mongoose.connect('mongodb://localhost/', {useNewUrlParser : true})
// .then(()=> console.log('Mongodb is running'),(err)=> console.log(err) )
// //
app.set('view engine', 'ejs');
// mongoose.set('useCreateIndex', true);

//true for embaded ojects in schema/db 
app.use(express.urlencoded({extended:true}));
//post man instad of ejs
app.use(express.json())

app.use(express.static('public'));
app.use(methodOverride('_method'));
//use routs 



app.get('/', (req, res)=>{
    res.send('Hello world');
  });
  
  app.get('/somedata', (req, res) => {
    res.send('here is your information');
});
  // listener 

app.listen(port, ()=> {
    console.log("I am listening for requests!!!");
  });