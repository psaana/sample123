// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost/local'); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// listen (start app with node server.js) ======================================
app.listen(8080);


// routes ======================================================================
var userSchema = new mongoose.Schema({ fName: 'string', lName: 'string', technology: 'string', location: 'string' });
var Users = mongoose.model('UserTable', userSchema);


// Get all Users
app.get('/api/users', function (req, res) {
    Users.find({}, function (err, users) {
        if (err) {
            res.send(err)
        } else {
            res.json(users);
        }
    });
});


//Search User by first name or by last name
app.get('/api/findUser/:userName', function (req, res) {
    var userEnteredItem = req.params.userName;
    
    console.log(userEnteredItem);
   
    var query = Users.find({fName : { "$regex": userEnteredItem, "$options": "i" } });

    //query.where('fName').equals(userEnteredItem);
    //query.where('lName').equals(userEnteredItem);
    query.exec(function (err, users) {
        if (err) {
            res.send(err)
        } else {
            res.json(users);
        }
    });

});


// Create User
app.post('/api/user', function (req, res) {
    Users.create({
        fName: req.body.fName,
        lName: req.body.lName,
        technology: req.body.technology,
        location: req.body.location
    }, function (err, users) {
        if (err) {
            res.send(err);
        }
        // get and return all the users after you create new one
        Users.find(function (err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });

});
