const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const userController = require("../controllers/userController");


const authenticate = async function(req, res, next) {
    //check the token in request header
    //validate this token
    let userId = req.params.userId;
    let userDetails = await userModel.findById(req.params.userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });
  
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });
     if(!token) return res.send({status: false, msg: "token must be present in the request header"})
     let decodedToken = jwt.verify(token, 'functionup-thorium')

    if(!decodedToken) return res.send({status: false, msg:"token is not valid"})

    next()
}


const authorise = async function(req, res, next) {
    
    let header= req.headers
    let token = header["x-auth-token"]||header['X-AUTH-TOKEN'];
    let userDetails = await userModel.findById(req.params.userId);


    if (!userDetails){    return res.send({ status: false, msg: "No such user exists" });}

    let decodedToken = jwt.verify(token, 'functionup-thorium')

    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId
             if(userToBeModified !== userLoggedIn) {
                    return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
                }


   return next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
