const express = require('express');
const router = express.Router();



router.get("/tese-me",function(req,res){
    res.send("Hlw")
})

module.exports = router