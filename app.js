var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    articles = require('./models/articles'),
    Userdb = require('./models/user'),
    session = require('express-session'),
    flash=require('connect-flash'),
    passport = require('passport');


var app = express();

//call the passport config
require('./config/passport')(passport);

//use the public file
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//ejs
app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect('mongodb://iyad:568887466@cluster0-shard-00-00-lgmjl.mongodb.net:27017,cluster0-shard-00-01-lgmjl.mongodb.net:27017,cluster0-shard-00-02-lgmjl.mongodb.net:27017/law?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
});

//global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');

    //data about the current user
    res.locals.currentUser=req.user;
    next();
})

//routes
app.use('/home', require('./routes/homeadclickedart'));
app.use('/home/post', require('./routes/post'));
app.use('/home/user', require('./routes/user'));

//render the home page
app.get('/', (req, res) => {
    articles.find({}, (err, data) => {
        if (err) {
            res.redirect('/home')
        } else {
            res.render('home', {
                data: data
            });
        }
    })
});


app.listen(3000, () => {
    console.log('server started');
})