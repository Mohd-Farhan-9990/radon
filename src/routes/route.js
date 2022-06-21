const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController.js")          //importing blog Controller
const authorController = require("../controllers/authorController")         //importing author Controller



router.post("/authors",authorController.createAuthor)           // Api for author's data Creation
router.post("/blogs",blogController.createBlog)                 //Api for blogs data creation
router.put("/blogs/:blogId",blogController.updateBlog)
module.exports = router