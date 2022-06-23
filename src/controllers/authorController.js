const authorModel = require("../models/authorModel.js")


//=====================================================CreatingAuthor==================================================

const createAuthor = async function(req,res){
    try{
        let data1 = req.body
        if(Object.keys(data1).length==0){
            return res.status(400).send({Status:false, msg:"Empty Body"})
        }
        const{name,title,email,password} = data1
        if(!isNaN(name) || !name){
            return res.status(400).send({Status:false, msg:"Name Should Not be empty or Name should not be a Number"})
        }
        else if(!title){
            return res.status(400).send({Status:false, msg:"title Should Not be Empty"})

        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).send({Status:false, msg:"Invalid Email Syntax"})
        }
        else if(!password){
            return res.status(400).send({Status:false, msg:"Password Should Not be Empty"})

        }
       else{ 
        let finaldata = await authorModel.create(data1)
        return res.status(201).send({Status:true,data:finaldata})}
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}

module.exports.createAuthor =createAuthor