var express = require('express'),
    articles = require('../models/articles');
    

var router = express.Router();

//render the post page
router.get('/', (req, res) => {
    res.render('post');
})

//handle the post requset from post page
router.post('/new', (req, res) => {

    let lawContent = [];
    // convert the objects to an array 
    //take only the values of the objects
    for (let key in req.body.content) {
        lawContent.push(req.body.content[key]);

    }

    //get the data from the form  
    let newarticel = ({
        title: req.body.law.title,
        brief: req.body.law.brief,
        year: req.body.law.year,
        lawNumber: req.body.law.lawNumber,
        content: lawContent
    });

    //create the new law in the db
    articles.create(newarticel, (err, data) => {})
    res.redirect('/home');
});

module.exports = router