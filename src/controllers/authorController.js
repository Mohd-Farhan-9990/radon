const authorModel = require("../models/authorModel.js")
const jwt = require('jsonwebtoken')


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


//=======================================================logging In ======================================================
const loginAuthor = async (req,res)=>{
    try{
            let{email,password}=req.body
            //email and password empty or not
            if(!email || !password) {
              return res.status(400).send({status:false,msg:"email and password required"})
            }
            //email valid or not
            if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))){
              return res.status(400).send({status:false,msg:"Enter a valid Email"})
            }
            let authorDetail=await authorModel.findOne({email,password})
            if(!authorDetail) return res.status(400).send({status:false,msg:"email or password is invalid"})
            let token=jwt.sign(
                {
                authorid:authorDetail._id.toString()
                },"Group 17/blog-project-1"
            )
            console.log(token)
            res.setHeader("x-api-key",token)  
            return res.status(200).send({status:true,TOKEN:token})
    }
  
    catch(err){
            return res.status(500).send({status:false,msg:err.message})
        }
  
      }
  

module.exports={createAuthor,loginAuthor}
