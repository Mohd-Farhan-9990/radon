const mongoose = require('mongoose')

const bukschema = new mongoose.Schema({
    bookName :{
        type: String,
        unique:true,
        required:true

    },
   priceInfo :{
        INR:  Number,
        europeanCurrency : Number
    },
    tags : [
        {
            type : String
        }
    ],
    year:{
        type :Number,
        default:2021
     } ,
      authorName :String,
    totalPages : Number,
    stockAvailable : Boolean

},{timestamps:true});

module.exports = mongoose.model('Assignment',bukschema)



const book = new mongoose.Schema({
    name:String,
        author_id:{
            type:Number,
            required:true
        },
        price:Number,
        ratings:Number

},{timestamps:true})
module.exports = mongoose.model('BooksAss',book)
