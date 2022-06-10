const UserModel= require("../models/userModel")
const moment = require('moment');





const basicCode= async function(req, res) {
    let tokenDataInHeaders= req.headers.token
    console.log(tokenDataInHeaders)

    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    res.send({ msg: "This is coming from controller (handler)"})
    }



const midlassign = async function(req,res){
    let date = Date.now()
    let date1 = moment(date).format('YYYY-MM-DD, h:mm:ss')
     const path = req.path
    const IP = req.socket.localAddress
    res.send({msg: "  Current TimeStamp is  "+date+"  Current Date is  "+date1+"   Path of route is "+path+"    IP addres is  "+IP})
}

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.midlassign  = midlassign
module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.basicCode= basicCode