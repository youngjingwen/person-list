const mongoose = require('mongoose');

var persons = mongoose.Schema({
  name:{type:String},
  age: {type:Number},
  gender:{type:String},
  email:{type:String}
})

module.exports = mongoose.model('person',persons)
