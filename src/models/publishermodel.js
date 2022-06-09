const mongoose = require('mongoose');

const publisher = new mongoose.Schema({

    publisher_id : String,
    pname: String,
    headquarter : String

},{timestamps:true});

module.exports = mongoose.model('newpublisher',publisher)