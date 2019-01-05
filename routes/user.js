var express = require('express'),
    Userdb = require('../models/user'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

var router = express.Router();

//global variable
let errorSignUp = [];


//render the login page
router.get('/login', (req, res) => {
    //send error if there any
    res.render('authentication/login', {
        errorSignUp: errorSignUp
    })
    //rest the error every time render
    errorSignUp = [];
})

router.post('/register', (req, res) => {

    //before register any user we need to check things
    //find if there is already registered email
    Userdb.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            errorSignUp.push({
                msg: 'البريد الإلكتروني مسجل مسبقاً'
            })
        }
        //check if there is any error
        if (errorSignUp.length > 0) {
            //redirect to the login so we can render the error if there any
            res.redirect('/home/user/login')

            //if there are no error then create the new user
        } else {
            let newuser = new Userdb({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            //hash the password
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newuser.password, salt, function (err, hash) {

                    //set passwor as hash
                    newuser.password = hash

                    //save the user
                    newuser.save((err, data) => {
                        if (err) {
                            res.send(err)
                        } else {
                            //add Successfully msg the the local vars
                            req.flash('success_msg', ' سجلت بنجاح, يمكنك الان تسيجل الدخول');

                            res.redirect('/home/user/login');
                        }
                    })
                });
            });
        }
    })
})

//handle the login post
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/home/user/login',
        failureFlash: true
    }) (req, res, next);
});

//handle the logout 
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','تم تسجيل الخروج بنجاح')
    res.redirect('/home/user/login');
})



module.exports = router