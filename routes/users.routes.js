const User = require('../models/User').User;
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport');

// const passportHelper = require('../config/passport')

router.get('/:parentEmail', (request, response)=>{
  User.findOne({ 'email':request.params.parentEmail  })
  .then(user => {
    if(user.parent){
   response.status(200).json({ parent : user})
    }
    else{
      response.status(400).json({ parent : "not parent"})
    }
  }).catch(err => {
   response.send({message : err})
  })
})

router.get('kids/:parentId', (request, response)=>{
  User.findById(request.params.parentId)
  .then(kids => {
   response.send({message : "usershome"})
   //response.status(200).json({ book : book})
  }).catch(err => {
   response.send({message : err})
  })
  
})
module.exports = router