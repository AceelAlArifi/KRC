const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    name: {type: String, required : true},
    location:String,
    date:Date,
    time:String,
    orgnizedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    desscription: String,
    //book 
},{timestamps: true})

const Event = mongoose.model('Event', eventSchema)
module.exports.eventSchema = eventSchema
module.exports.Event = Event;