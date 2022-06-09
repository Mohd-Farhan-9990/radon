const express = require('express');
const router = express.Router();

// const UserModel= require("../models/userModel.js")
const bookModel= require("../models/bookModel.js")
const bookcontroller= require("../controllers/bookcontroller")
const authorcontroller= require("../controllers/authorcontroller")

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
router.post("/author", authorcontroller.author)
router.post("/bookass", authorcontroller.bookass)
router.get("/booksbyauthor",authorcontroller.booksbyauthor)
router.get("/authorName",authorcontroller.authorName)
router.get("/respondback",authorcontroller.respondback)
router.get("/book/ids",authorcontroller.booknameid )


module.exports = router;