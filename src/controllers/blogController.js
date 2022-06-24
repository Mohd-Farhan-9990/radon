const blogModel = require("../models/blogModel")
const { default: mongoose, isValidObjectId } = require("mongoose")
const moment = require('moment');



//======================================================creatingBlog====================================================

    const createBlog = async function(req,res){
       try{
            let res1  = req.body
            if(Object.keys(res1).length==0){
                return   res.status(400).send({status:false,msg:"Empty Body"})
            }
            let{title,body,tags,category,subCategory} = res1
            let id = req.body.authorId                                                           //Getting the authorId from Body
                if(!id){                                                                         //Checking If Id is there or not
                    return res.status(400).send({status:false,msg:"AuthorId should Not be Empty"})

                }                                                                    
                else if(!isValidObjectId(id)) {                                              //Checking If Id is valid or Not
                    return res.status(400).send({status:false,msg:"Author Doesn't Exist with this Id"})
                }
                   else if(!title){
                        return res.status(400).send({Status:false,msg:"Title Should Not Be empty"})
                    }
                    else if(!body){
                        return res.status(400).send({Status:false,msg:"Body Should Not Be Empty"})
                    }
                    else if(!tags){
                        return res.status(400).send({Status:false,msg:"Tags Should Not Be Empty"})
                    }else if(!category){
                        return res.status(400).send({Status:false,msg:"Bcategory Should Not Be Empty"})
                    }else if(!subCategory){
                        return res.status(400).send({Status:false,msg:"subCategory Should Not Be Empty"})
                    }else{
                   let finaldata = await blogModel.create(res1)
                    return res.status(201).send({data:finaldata})
                    }
                
            
            
       }
       catch(err){
            return res.status(500).send({status:false,msg:err.message})
       }
    }

//====================================================GET BLOGS ======================================================
 
const getBlog =  async function(req,res){

    try{
            let quer = req.query                                                            //getting the data from querry
            const{authorId,category,tags,subCategory} = quer                               //destructing data
            console.log(category)
           
                    // let getD =  await blogModel.find({$and:[{isDeleted:falseisPublished:true},{$or:[{category:category}||{tags:tags}]}]}).populate('authorId')     // finding data with some cndtions
                    let getD = await blogModel.find({$and:[{isDeleted:false,isPublished:false},{$or:[{_id:authorId},{category:category},{tags:{$in:[tags]}},{subCategory:{$in:[subCategory]}}]}]}).populate('authorId')
                    console.log(category)
                    if(getD.length>0){
                        return res.status(200).send({Status:true,data:getD})
                    }
                    else{
                    return res.status(400).send({Status:false,msg:"No Data Availabe with these Parameters"})
                    }
            
        }
        catch(err){
          return res.status(500).send({Status:false,msg:err.message})
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
                            {new: true}                                                                                                  //returning new updated value
                    )
                
                        if(updatedData){                                                            //Checking if data is upadated or not for isDeleted False
                                    return res.status(201).send({data:updatedData})
                        }else{
                            return res.status(400).send({Status:false,msg:" "})
                        }
                }else{return res.status(400).send({Status:false,msg:" "})}
                

        }
        catch(err)
        {
           return res.status(500).send(err.message)
        }
    }




    //==========================================DELETE BY BLOG-ID AS PARAMS===========================================

const deleteBlogsById = async function (req, res) {
    try {
            let blogId = req.params.blogId;
            let result = await blogModel.findOne({
                _id: blogId,
                isDeleted: false
            });

            if (!result) return res.status(404).send({status: false,msg: "User data not found" })
            else{
                let updated = await blogModel.findByIdAndUpdate(
                {  _id: blogId,isDeleted: false},
                {isDeleted: true,deletedAt: Date()},
                {new: true});
        
            
                return res.status(200).send({Status: true,data:updated });
            }
            
       
    } catch (error) {
              res.status(500).send({status: false,msg:" "});
    }

};



//===============================================DELETE BY QUERY=======================================================


const deleteBlogsByQuery = async function (req, res) {
    try {
          let quer = req.query
          const{category,authorId,tags,subCategory}= quer
          let result = await blogModel.findOneAndUpdate({
            $or:[{category:category} || {authorId:authorId} || {tags:[tags]}|| {subCategory:[subCategory]}]},
            {$set:{isDeleted:true}},
            {new:true}
          )
          return res.status(200).send({Status:true,data:result})
       }
        catch (error) {
        res.status(500).send({status: false, msg: error.message});
    }
};







    module.exports={createBlog,updateBlog,getBlog,deleteBlogsById,deleteBlogsByQuery}
   

