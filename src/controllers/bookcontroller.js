const res = require('express/lib/response')
const bookModel = require('../models/bookModel')
const authormodel = require('../models/authormodel')

const takeEntry = async function(req, res){
    let data = req.body
    let savedata = await bookModel.create(data)
    res.send({msg: savedata})
}

const getData = async function(req, res){
    let alldata = await bookModel.find()
    res.send({msg: alldata})
}
const createBook = async function(req,res){
    let data = req.body 
    let saveData = await bookModel.create(data)
    res.send({msg:saveData})
}
const bookList = async function(req,res){
    let book = await bookModel.find().select({bookName:1 ,authorName:1})
    res.send({msg:book})
}
const getBooksInYear = async function(req,res){
    let getyear = req.body.year
    let books  = await bookModel.find( {"year" : getyear})
    res.send({msg:books})
}
const getXINRBooks = async function(req,res){
    let allBooks = await bookModel.find({$or: [{"priceInfo.INR":100},{"priceInfo.INR":200},{"priceInfo.INR":500}]})
    res.send({msg:allBooks})

}
const getParticularBooks = async function(req,res){
    let data = req.param
    let allbooks = await bookModel.find({$or:[{bookName:data.bookName},{authorName:data.authorName}]})
}
const getRandomBooks = async function(req,res){
    let allbooks = await bookModel.find({$or: [{stockAvailable:true},{"totalPages":500}]})
    res.send({msg:allbooks})
}
const author = async function(req,res){
    let data = req.body
    let all = await authormodel.create(data)
    res.send({msg:all})
}
const bookass = async function(req,res){
    let data = req.body
    let allbook = await bookModel.create(data)
    res.send({msg:allbook})
}

const booksbyauthor = async function(req,res){
    // let name = req.body
    let data =  await authormodel.find({author_name:"Chetan Bhagat"}).select({"author_id":1})
    console.log(data)
    let alldata = await bookModel.find({author_id:data[0].author_id})
    res.send({msg:alldata})
}
const authorName = async function(req,res){
        let data = await bookModel.findOneAndUpdate(
            {name:"Two States"},
            {$set:{price:100}} ,
            {new:true},       
        ).select({"author_id":1 , "price":1})
        let nprice = data.price
        let findata = await authormodel.find({author_id:data.author_id}).select("author_name")
        res.send({msg:findata,nprice})
    }


    const respondback = async function(req,res){
        let data = await bookModel.find({price :{$gte:50, $lte:100}}).select({"author_id":1})
        let findata = await authormodel.find({author_id:data[0].author_id}).select("author_name")
        res.send({msg:findata})
    }
    
module.exports.respondback = respondback    
module.exports.authorName = authorName    
module.exports.booksbyauthor = booksbyauthor
module.exports.author = author
module.exports.bookass = bookass
module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
module.exports.getParticularBooks = getParticularBooks
module.exports.takeEntry = takeEntry
module.exports.getData = getData