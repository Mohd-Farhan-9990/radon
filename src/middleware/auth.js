const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const userController = require("../controllers/userController");
const { default: mongoose, isValidObjectId } = require("mongoose");




const authenticate = async function(req, res, next) {
    //check the token in request header
    //validate this token
    try{
            let userId = req.params.userId;
            
            if(userId.length<=0){
                  res.status(401).send("UserId must be present")
                }   
            if(!isValidObjectId(userId)){
                  res.status(401).send("Invalid User Id")
                }
            let token = req.headers["x-Auth-token"];
            if (!token) token = req.headers["x-auth-token"];
          
            //If no token is present in the request header return error
            if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
            let decodedToken = jwt.verify(token, 'functionup-thorium')

            if(!decodedToken) return res.status(401).send({status: false, msg:"token is not valid"})
            next()
    }
    catch(a)
    {
      res.status(500).send(a.message)
    }
}


const authorise = async function(req, res, next) {
    try{
        let header= req.headers
        let token = header["x-auth-token"]||header['X-AUTH-TOKEN'];
        let decodedToken = jwt.verify(token, 'functionup-thorium')
        let userToBeModified = req.params.userId
        let userLoggedIn = decodedToken.userId
             if(userToBeModified !== userLoggedIn) {
                    return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
                }


       return next()
      }
      catch(error){
        res.send(error.message)
      }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
