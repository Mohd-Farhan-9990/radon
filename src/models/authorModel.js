const mongoose = require('mongoose');
const {isEmail} = require('validator') 

const authorSchema = new mongoose.Schema( {
    name:{ 
        type: String,
        required :true 
    },

   title:{
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
   },

   email:{
        type : String,
        required:true,
       unique: true
   },

   password:{
    type:String,
    required: true
   }
}, { timestamps: true });


module.exports = mongoose.model('author', authorSchema)
