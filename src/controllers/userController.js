const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const userModel = require("../models/userModel");

// const createUser = async function (req,res) {
//   //You can name the req, res objects anything.
//   //but the first parameter is always the request 
//   //the second parameter is always the response
//   let data = req.body;
//   let savedData = await userModel.create(data);
//   res.send({ msg: savedData });
// };

const createUser = async function(req,res){
  let data = req.body
  
  let finaldata = await userModel.create(data)
  res.send({msg:finaldata})
}

const loginUser = async function (req, res) {
  

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;

  let userDetails = await userModel.findById(userId);

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },userData);
  res.send({ status: updatedUser, data: updatedUser });
};

const deleteData1 = async function(req,res){
  
  let userId = req.params.userId;

  // let userData =mongoose.Schema.users.marks( {"isDeleted":true})
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId} ,{$push:{"isDeleted":true}},{new:true});
  console.log("hlw")
  res.send({msg:updatedUser})

}
module.exports.deleteData1 = deleteData1
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
