var mongoose = require('mongoose');

var articlesSchema = new mongoose.Schema({
            title: String,
            brief: String,
            year: String,
            lawNumber: String,
            content: { type : Array , "default" : [] }
            })

        module.exports = mongoose.model('article', articlesSchema)