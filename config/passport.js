var LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs');


//call the user model
var Userdb = require('../models/user');


module.exports = function (passport) {
    passport.use(new LocalStrategy({
            usernameField: 'email'
        },
        (email, password, done) => {

            //match the email
            Userdb.findOne({
                email: email
            }, (err, user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'البريدالإلكتروني غير صحيح'
                    });
                }

                //match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'كلمة السر غير صحيحة'
                        });
                    }
                });
            });
        }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Userdb.findById(id, function (err, user) {
            done(err, user);
        });
    });
}