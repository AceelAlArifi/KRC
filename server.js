const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Hello world');
  });
  
  app.get('/somedata', (req, res) => {
    res.send('here is your information');
});
  
app.listen(3003, ()=> {
    console.log("I am listening for requests!!!");
  });