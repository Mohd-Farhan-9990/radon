const authorModel = require("../models/authorModel.js")

//=====================================================CreatingAuthor==================================================

const createAuthor = async function(req,res){
    try{
        let data1 = req.body
        if(Object.keys(data1)==0){res.status(404).send({Status:false.valueOf, msg:" "})}
        let finaldata = await authorModel.create(data1)
        res.status(201).send({Status:true,data:finaldata})
    }
    catch(err){
        res.status(500).send({status:false,msg:""})
    }
}

module.exports.createAuthor =createAuthor