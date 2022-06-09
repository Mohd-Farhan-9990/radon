const { default: mongoose, isValidObjectId } = require("mongoose")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const pulisherModel= require("../models/publishermodel")


const createBook= async function (req, res) {
    let book = req.body
    let id = req.body.author_id
    
    let pubid = req.body.publisher_id
   
    
     if(id.length>0 && pubid.length>0){
             if(isValidObjectId(id) && isValidObjectId(pubid)){   
                let bookCreated = await bookModel.create(book)
                  res.send({data: bookCreated})
                 }
                 else{
                     res.send("Author id or Publisher id is not valid")
                 }
             }     
        else{
            res.send("Author id or Publisher id should not be empty")
         }
    

}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author_id','publisher_id'])
    res.send({data: specificBook})

}
const book  = async function(req,res){
    let data1 = await bookModel.updateMany(
        {pname:"Penguin", pname:"HarperCollins"},
        {isHardCover:true}
    )
    let data  = await bookModel.updateMany(
        {ratings:{$gt:3.5}},
        {$inc:{price:10}}
    )
    

    res.send({data1})
  
}
module.exports.book = book
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
