const User = require('../models/User').User;
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport');

// const passportHelper = require('../config/passport')


// router.get('/:uId', (request, response)=>{
//   User.findOne({ 'email':request.params.uId  })
//   .then(user => {
//     response.status(200).json({ parent : user})
//   }).catch(err => {
//    response.send({message : err})
//   })
// })

router.get('/kids/:parentId', (request, response)=>{
  User.findById(request.params.parentId)
  .then(parent => {
    console.log(parent.kids)
    var object =[]
    var itemsProcessed = 0;
    parent.kids.forEach(kid =>{
      User.findById(kid).then(kidelement =>{
        object.push(kidelement)
        // console.log(kidelement)
            itemsProcessed++;
            if(itemsProcessed === parent.kids.length) {
              response.send(object)
            }
          });
        });
      // response.status(200).json(parent.kids)
   //response.status(200).json({ book : book})
  }).catch(err => {
   response.send({message : err})
  })
  
})

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

module.exports = router