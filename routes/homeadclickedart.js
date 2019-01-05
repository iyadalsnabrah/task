var express = require('express'),
    articles = require('../models/articles'),
    {isLoggedIn}=require('../config/auth');

var router = express.Router();

//render the home page
router.get('/', (req, res) => {
    articles.find({}, (err, data) => {
        if (err) {
            res.redirect('/home')
        } else {
            res.render('home', {
                data: data
            });
        }
    });
});

//render the clicked law
router.get('/article/:id',isLoggedIn,(req, res) => {
    //find the clicked law to get his data
    articles.findById(req.params.id, (err, data) => {
        if (err) {
            res.redirect('/home')
        } else {
            res.render('clickedlaw/clickedlaw', {
                data: data
            });
        }
    });
});

module.exports = router