const mongoose = require('mongoose')

const User = mongoose.model('User' , {
    
name : String , 
email : String ,
phone: String,
password : String,
confpassword: String

}) 


module.exports = User