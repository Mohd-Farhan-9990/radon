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
module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
module.exports.getParticularBooks = getParticularBooks
module.exports.takeEntry = takeEntry
module.exports.getData = getData