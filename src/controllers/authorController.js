const authorModel = require("../models/authorModel.js")

//=====================================================CreatingAuthor==================================================

const createAuthor = async function(req,res){
    try{
        let data1 = req.body
        let finaldata = await authorModel.create(data1)
        res.status(201).send({status:true,data:finaldata})
    }
    catch(err){
        res.status(500).send({status:false,msg:""})
    }
}

module.exports.createAuthor =createAuthor