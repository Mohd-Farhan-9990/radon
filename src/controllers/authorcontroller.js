const res = require('express/lib/response')

const authormodel = require('../models/authormodel')
const bookModel = require('../models/bookModel')


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
    let data =  await authormodel.find({author_name:"Chetan Bhagat"}).select({author_id:1})
    console.log(data)
    let alldata = await bookModel.find({author_id:data[0].author_id})
    res.send({msg:alldata})
}
const authorName = async function(req,res){
        let data = await bookModel.findOneAndUpdate(
            {name:"Two States"},
            {$set:{price:100}} ,
            {new:true},       
        ).select({author_id:1})
        let nprice = data.price
        let findata = await authormodel.find({author_id:data.author_id}).select({author_name:1})
        res.send({msg:findata,nprice})
    }


    const respondback = async function(req,res){
        let data = await bookModel.find({price :{$gte:50, $lte:100}}).select({author_id:1})
        console.log(data)
       let arr =[]
        for(let i=0; i<data.length; i++){
        let findata = await authormodel.find({author_id:data[i].author_id}).select({author_name:1})
       arr.push(findata)
        
    } res.send({msg:arr})
    }

    const booknameid = async function(req,res){
        let id = req.param.authorid
        let data = await authormodel.find({authodr_id:id}).select({author_name:1})
        let data1 = await bookModel.find({author_id:id}).select({name:1})
        res.send({msg:data1})
    }
        
    // const age = async function(req,res){
    //     let data1 = await function ({ratings: {$gt:4}})
    //     let data = await authormodel.find({})
    // }
        
    module.exports.booknameid =  booknameid  
module.exports.respondback = respondback    
module.exports.authorName = authorName    
module.exports.booksbyauthor = booksbyauthor
module.exports.author = author
module.exports.bookass = bookass