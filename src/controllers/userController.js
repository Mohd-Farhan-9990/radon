const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
 try{ let data = abcd.body;
      let savedData = await userModel.create(data);
      console.log(abcd.newAtribute);
      xyz.status(201).send({ msg: savedData });
    }
  catch(error){
      xyz.status(400).send(error.message)
    }
};

const loginUser = async function (req, res) {
 try{ 
          let userName = req.body.emailId;
          let password = req.body.password;
          let user = await userModel.findOne({ emailId: userName, password: password });
          if (!user)
            return res.send({
              status: false,
              msg: "username or the password is not corerct",
            });

          // Once the login is successful, create the jwt token with sign function
          // Sign function has 2 inputs:
          // Input 1 is the payload or the object containing data to be set in token
          // The decision about what data to put in token depends on the business requirement
          // Input 2 is the secret
          // The same secret will be used to decode tokens
          let token = jwt.sign(
            {
              userId: user._id.toString(),
              batch: "thorium",
              organisation: "FUnctionUp",
            },
            "functionup-thorium"
          );
          res.setHeader("x-auth-token", token);
          return  res.send({ status: true, data: token });
 }catch(error){
     return res.send(error.message)
 }
};

const getUserData = async function (req, res) {
 try{
          let userId = req.params.userId
          let userDetails = await userModel.findById(userId);
          return res.send({ status: true, data: userDetails });
 }
 catch(error){
        return res.send(error.message)
 }
};


const updateUser = async function (req, res) {
  try{

          let userId = req.params.userId;
          let userData = req.body;
          let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
          res.send({ status: updatedUser, data: updatedUser });
  }
  catch(error){
    res.send(error.message)
  }
};

const isDeleted1 = async function(req,res){

      let userId = req.params.userId
      let findata  = await userModel.findOneAndUpdate({_id:userId},{$set: {isDeleted:true}})
      res.send({Status:true, msg:findata})

}


const postMessage = async function (req, res) {
    try{
          let message = req.body.message
          let user = await userModel.findById(req.params.userId)
          let updatedPosts = user.posts
          //add the message to user's posts
          updatedPosts.push(message)
          let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})
          return res.send({status: true, data: updatedUser})
    }
    catch(error){
      res.send(error.message)
    }
  }

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.isDeleted1 = isDeleted1
module.exports.postMessage = postMessage

