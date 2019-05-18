var express = require('express')
var path = require('path');
var app = express();
var session = require('express-session');

//Access Static files
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

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

var userdetails = mongoose.model("userdetails", userSchema);

app.post('/login',function(req,res){
    console.log(req.body);
    userdetails.find({
        email: req.body.userName,
        password: req.body.passWord
    }).exec(function(error,data){
        console.log(data);
        req.session.isLogin = 1;
        req.session.userName = req.body.userName;
        req.session.password = req.body.passWord;
        req.session.data = data;
        res.send(data);
    });
});

app.get("/admin/userlist",function(req,res){
    res.render('userlist',{data: req.session.data});
});

app.get("/admin/profile", function(req, res) {
    res.render('homepage', {data: req.session.data});
})

app.get('/changePassword',function(req,res){
    res.render('changepassword',{data: req.session.data});
});

app.get('/admin/adduser',function(req,res){
    res.render('adduser',{data: req.session.data});
});

app.get('/tag',function(req,res){
    res.render('tag',{data: req.session.data});
});

app.get('/',function(req,res){
    console.log(req.body);
    if(req.session.isLogin){
        console.log("Already Logged in");
        res.render('homepage',{data: req.session.data});
    } else {
        console.log("New User");
        res.sendFile(path.join(__dirname,'public','login.html'));
    }
});

app.get('/profile',function(req,res){
    res.render('profile',{data: req.session.data});
})

app.get('/editProfile',function(req,res){
    res.render('editprofile',{data: req.session.data});
})

//Function to update the password
app.put('/changePassword',function(req,res){
    console.log(req.body);
    userdetails.findOneAndUpdate(
        {
            _id: req.body._id,
            password: req.body.oldPassword  // search query
        }, 
        {
          password: req.body.newPassword   // field:values to update
        },
        {
          new: true,                       // return updated doc
          runValidators: true              // validate before update
        })
        .then(data => {
            console.log(data)
            res.send(data)
          })
          .catch(err => {
            console.error(err)
            res.send(error)
          })
});

//Function to add in the database
app.post('/admin/adduser',function (req, res) {
    console.log(req.body);
    let newUser = new userdetails({
        name: req.body.name,
	    email: req.body.email,
	    password: req.body.password,
	    city: req.body.city,
	    phoneno: req.body.phoneno, 
	    gender: "male",
	    dob: "11/08/1999",
	    role: "admin"
    })
    newUser.save()
     .then(data => {
       console.log(data)
       res.send(data)
     })
     .catch(err => {
       console.error(err)
       res.send(error)
     })
    
  })

app.listen(8000);

console.log("Running on port 8000");