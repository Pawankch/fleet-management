const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fleet',{useNewUrlParser:true,useCreateIndex:true})

module.exports = mongoose