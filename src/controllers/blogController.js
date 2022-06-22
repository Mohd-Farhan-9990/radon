const blogModel = require("../models/blogModel")
const { default: mongoose, isValidObjectId } = require("mongoose")
const moment = require('moment');


//======================================================creatingBlog====================================================

    const createBlog = async function(req,res){
       try{
            let data  = req.body
            if(Object.keys(data)==0){return   res.status(400).send({status:false,msg:""})}
            let id = req.body.authorId                                                           //Getting the authorId from Body
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
                let id = req.params.blogId                      //getting the id
                let data2 = req.body                                            //Storing body data in data2 object
                const{title,body,tags,subCategory} = data2                      //destructing the data2
                let date = Date.now()                                           //getting timestamps value 
                let date1 = moment(date).format('YYYY-MM-DD, h:mm:ss')          //formatting timestamps value in correct form
                if(isValidObjectId(id)){                                        //Validating Id
                    let updatedData = await blogModel.findOneAndUpdate(         
                            {_id:id,isDeleted:false},                                                       //Condition in FindAnd Update           
                            {$set:{title:title,body:body,publishedAt:date1,isPublished:true},$push:{tags:tags,subCategory:subCategory}},         //Updation
                            {$new:true}                                                                                                  //returning new updated value
                    )
                
                        if(updatedData){                                                            //Checking if data is upadated or not for isDeleted False
                                    return res.status(201).send({data:updatedData})
                        }else{
                            return res.status(404).send({Status:false,msg:" "})
                        }
                }else{return res.status(400).send({Status:false,msg:" "})}
                

        }
        catch(err)
        {
           return res.status(500).send(err.message)
        }
    }

    module.exports.createBlog =createBlog
    module.exports.updateBlog=updateBlog


