const trim = function(){
    let str = "   FunctionUp  "
    console.log(str+ " : After trim is  : " +str.trim())
}
const changetoLowercase = function(){
    let str = "RADON BATCH"
    console.log(str + " : string chaneged to lower case  : " + str.toLowerCase())
}
const changetoUpperCase =function(){
    let str = "node js module"
    console.log (str + " :  string Changed to Upper Case :" + str.toUpperCase())
}

module.exports.tr = trim
module.exports.lower = changetoLowercase
module.exports.upper = changetoUpperCase