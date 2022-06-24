const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const blogSchema = mongoose.Schema({
    title:{
        type :String,
        required:true
    },
    body:{
        type :String,
        required:true
    },
    authorId:{
        type:ObjectId,
        ref:"author"
    },
    tags:[{type: String}],
    category:{type:String,
                required:true},
    subCategory : [{type:String}],
    deletedAt:{type:Date},
    isDeleted:{
                type:Boolean,
                default:false
            },
    publishedAt:{type:Date},
    isPublished:{type:Boolean,
                default:false}        


},{timestapms:true})

module.exports =  mongoose.model("Blogs",blogSchema)

