let axios = require("axios")

//--------------------------------------------Problem-1--Vaccine session by district code and date------------------------//



let getVacSesByDist = async function (req, res){
    try{
            let id = req.query.district_id     
            let date = req.query.date
            let option ={
                method : "get",
                url :`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`
            }
            let res1 = await axios (option)
            let data = res1.data
            return res.status(200).send({msg:data})
    }
    catch(error){

            return res.status(500).send(error.message)
    }
};

//----------------------------------------Problem -2 -- Weathe Of London -----------------------------------------------//


    let getWeathOfCity = async function(req,res){
        try{
        let city = req.query.q
        let id = req.query.appid
        let option = {
            method : "get",
            url : `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`
        }
        let res1 = await axios(option)
        let data = res1.data.main.temp
        res.status(200).send({msg:"Temprature of "+city+" is "+data})
        }
        catch(error){
            res.send(error.message)
        }

    }

//================================Sorting Cities On Basis Of Temp=====================================================

    let sortCityByTemp = async function(req,res){
        try{
            let arr = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
            let arrlen = arr.length
            let cities = []
            id = req.query.appid
            for(let i=0; i<arrlen; i++){

                let option = {

                    method : "get",
                     url : `http://api.openweathermap.org/data/2.5/weather?q=${arr[i]}&appid=${id}`
                    };
                    let res1 = await axios(option)
                    let res2 = res1.data.main.temp
                    cities.push({City:arr[i], temp:res2})
                }

            let data = cities.sort(function(x,y){
                return x.temp - y.temp
            })
            return res.status(200).send({msg:data})
           
        }
        
        catch (error){
            res.send(error.message)
        }
    }

    //==================================================MemeCaption======================================================//


let memeCaption = async function(req,res){
    
    try{
            let queries = req.query
            const{template_id,text0,text1,username,password} =queries

            let option = {
                method :"post",
                url : `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&$text1=${text1}&username=${username}&password=${password}`
            }
            let res1 = await axios(option)
            let  data1 = res1.data
            return res.send(data1)
    }
    catch(error){
             res.send(error.message)
    }
}

module.exports.memeCaption = memeCaption
module.exports.getVacSesByDist=getVacSesByDist
module.exports.getWeathOfCity = getWeathOfCity
module.exports.sortCityByTemp = sortCityByTemp

