const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const axiosassignController= require("../controllers/axiosassignController")
const memeController= require("../controllers/memeController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/vaccinesession", axiosassignController.getVacSesByDist)
router.get("/getweatherOfCity", axiosassignController.getWeathOfCity)
router.get("/getsortedcityByTemp", axiosassignController.sortCityByTemp)
router.post("/memecaption", axiosassignController.memeCaption)

router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;