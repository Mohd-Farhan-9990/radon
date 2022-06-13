const { default: mongoose, isValidObjectId } = require("mongoose")

const midlware = function(req,res,next){
   
    if(!req.headers.isfreeappuser)
    {
        res.send("Request is missing a mandatory header")
    }
    next()
}

const midlware2 = function(req,res,next){
    let userId = req.body.userId
    let prodId = req.body.productId
    if(!req.headers.isfreeappuser){
        res.send("Request body is missing a mandatory header")
    }
    if(userId.length > 0 && prodId.length > 0){
        if(isValidObjectId(userId) && isValidObjectId(prodId)){
            
    
            next()

        }else{
            res.send("Invalid UserId or ProdId")
        }
    }else{
        res.send("UserId or ProdId should Not be Empty ")
    }
}

module.exports.midlware = midlware
module.exports.midlware2 = midlware2