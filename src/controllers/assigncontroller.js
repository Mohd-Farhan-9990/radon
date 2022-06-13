const orderModel= require("../models/ordermodel")
const userModel= require("../models/assignusermodel")
const productModel= require("../models/productmodel")
const ordermodel = require("../models/ordermodel")

const createProduct = async function(req,res){
    let data = req.body
    let finaldata = await productModel.create(data)
    res.send({msg:finaldata})
}

const createUser = async function (req,res){
    let data= req.body
    let finaldata = await userModel.create(data)
    res.send({msg:finaldata})
}


const  createOrder = async function(req,res){
    const val = req.headers["isfreeappuser"]
    let data = req.body
                if(val==="true"){
                let data2 = await ordermodel.create(data)
                let finaldata = await ordermodel.updateMany(
                    {$set:{amount:0,isFreeAppUser:true}}
                    ) 
                let findata = await ordermodel.find()
                    res.send({msg:findata})
                }
            else{
                let data2 = await ordermodel.create(data)
                // let p = ordermodel.findOne({price}).populate('Product')
                // console.log(p)
                res.send({msg:data2})
                

            }

      
   
}

module.exports.createProduct = createProduct
module.exports.createUser = createUser
module.exports.createOrder= createOrder