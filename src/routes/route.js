const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const userModel = require("../models/userModel")
const midlware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login",midlware.mid1, userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",midlware.mid2, userController.getUserData)

router.put("/users/:userId",midlware.mid2, userController.updateUser)
router.delete("/users/:userId",midlware.mid2,userController.deleteData1)

module.exports= router;