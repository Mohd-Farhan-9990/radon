const express = require('express');
const router = express.Router();

// const UserModel= require("../models/userModel.js")
const bookModel= require("../models/bookModel.js")
const bookcontroller= require("../controllers/bookcontroller")
const authormodel= require("../models/authormodel.js")

// const UserController= require("../controllers/userController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)
router.post("/takeEntry", bookcontroller.takeEntry)
router.get("/getData", bookcontroller.getData)
router.post("/createBook", bookcontroller.createBook)
router.get("/bookList", bookcontroller.bookList)
router.post("/year", bookcontroller.getBooksInYear)
router.get("/INR", bookcontroller.getXINRBooks)
router.get("/pagesndstock", bookcontroller.getRandomBooks)
router.get("/data", bookcontroller.getParticularBooks)
router.post("/author", bookcontroller.author)
router.post("/bookass", bookcontroller.bookass)
router.get("/booksbyauthor",bookcontroller.booksbyauthor)
router.get("/authorName",bookcontroller.authorName)
router.get("/respondback",bookcontroller.respondback)


module.exports = router;