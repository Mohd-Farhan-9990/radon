const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController.js")
const authorController = require("../controllers/authorController")



router.post("/authors",authorController.createAuthor)
router.post("/blogs",blogController.createBlog)
module.exports = router