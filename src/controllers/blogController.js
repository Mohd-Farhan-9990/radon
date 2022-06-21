const blogModel = require("../models/blogModel")
const { default: mongoose, isValidObjectId } = require("mongoose")

//======================================================creatingBlog====================================================

    const createBlog = async function(req,res){
       try{
            let data  = req.body
            let id = req.body.authorId
            if(id){
                if(isValidObjectId(id)){
                   let finaldata = await blogModel.create(data)
                    return res.status(201).send({data:finaldata})
                }else{res.status(400).send({status:false,msg:"Author Doesn't Exist with this Id"})}
            }else{res.status(400).send({status:false,msg:"AuthorId should Not be Empty"})}
            
       }
       catch(err){
            return res.status(500).send({status:false,msg:""})
       }
    }


    module.exports.createBlog =createBlog


