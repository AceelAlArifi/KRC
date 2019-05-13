const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {type: String, required : true, unique: true},
    parent: {type: Boolean, required : true},
    name:  {type: String, required: true },
    userName:  {type: String, required : true, unique: true},
    password: {type: String, required: true },
    parentUser:{ type: Schema.Types.ObjectId, ref : 'User'},
    kids:[{ type: Schema.Types.ObjectId, ref : 'User'}]
},{timestamps: true})


userSchema.pre('save',function(next){
    let user = this

    if(user.password && user.isModified('password')){
        
      bcrypt.hash(user.password, saltRounds, (err, hash)=>{
        if(err){ return next()}

        user.password = hash
        next()
      })
    }

})
userSchema.methods.verifyPassword = (plainPassword, hashedPassword, cb) => {

    bcrypt.compare(plainPassword, hashedPassword, (err, response) => {
      if(err) { 
        return cb(err) 
      }
      return cb(null, response)
    })
   }

const User = mongoose.model('User', userSchema)
module.exports.userSchema = userSchema
module.exports.User = User;





