var express = require('express')
var path = require('path');
var app = express();
var session = require('express-session');

//Access Static files
app.use(express.static(path.join(__dirname,'public')));

//BodyParser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({secret: 'cQpOrTaL',saveUninitialized:true,resave:true}));

// Connect with db
var mongoose = require('mongoose')
var mongoDb = 'mongodb://localhost/myDB'

mongoose.connect(mongoDb, function (error) {
	if(error) {
		throw error;
	}
	console.log("Db opened Successfully");
});

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	city: String,
	phoneno: String, 
	gender: String,
	dob: String,
	role: String
});

var userDetails = mongoose.model("userdetails", userSchema);

app.post('/login',function(req,res){
    userDetails.find({
        email: req.body.userName,
        password: req.body.passWord
    }).exec(function(error,data){
        console.log(data);
        res.send(data);
    });
});

app.use('/login',function(req,res,next){
    if(req.session.isLogin){
        console.log('Already loggedin');
    } else {
        //Ask for id password
        req.session.isLogin = 1;
        console.log("login set bt middleware");
        res.send("Welcome");
    }
    next();
});

// var middleFunc = function(req,res,next){
//     if(req.session.isLogin){
//         console.log("Already LoggedIn");
//     } else {
//         //Ask fro id Password
//         console.log("login set bt middleware");
//         res.send("Welcome");
//     }
// }


app.listen(8000);


console.log("Running on port 8000");