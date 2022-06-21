const blogModel = require("../models/blogModel")
const { default: mongoose, isValidObjectId } = require("mongoose")
const moment = require('moment');


//======================================================creatingBlog====================================================

    const createBlog = async function(req,res){
       try{
            let data  = req.body
            if(Object.keys(data)==0){return   res.status(400).send({status:false,msg:""})}
            let id = req.body.authorId                                                   //Getting the authorId from Body
            if(id){                                                                     //Checking If Id is there or not
                if(isValidObjectId(id)){                                        //Checking If Id is valid or Not
                   let finaldata = await blogModel.create(data)
                    return res.status(201).send({data:finaldata})
                }else{res.status(400).send({status:false,msg:"Author Doesn't Exist with this Id"})}
            }else{res.status(400).send({status:false,msg:"AuthorId should Not be Empty"})}
            
       }
       catch(err){
            return res.status(500).send({status:false,msg:""})
       }
    }



//====================================================Updating Blogs==================================================

    const updateBlog = async function(req,res){
        try{
                let id = req.params.blogId
                let tit = req.body.title
                let bod =req.body.body
                let tag = req.body.tags
                let subCat =req.body.subCategory
                let updatedData = await blogModel.findOneAndUpdate(
                    {_id : id},
                    {$set:{title:tit,body:bod},$push:{tags:tag,subCategory:subCat}},
                    {$new:true}
                )
                res.send({data:updatedData})

        }
        catch(err)
        {
            res.send(err.message)
        }
    }

    module.exports.createBlog =createBlog
    module.exports.updateBlog=updateBlog


