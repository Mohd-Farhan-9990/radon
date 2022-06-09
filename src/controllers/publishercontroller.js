const publishermodel = require("../models/publishermodel")


const createpubData = async function(req,res){
    let data = req.body
    let data1 = await publishermodel.create(data)
    res.send({msg:data1})
}


const getpubData = async function(req,res){
    let data = await publishermodel.find()
    res.send({msg:data})
}


module.exports.createpubData = createpubData
module.exports.getpubData = getpubData