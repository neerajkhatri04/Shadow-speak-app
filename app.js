require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose  = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt');



const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "any secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
 
main().catch(err => console.log(err));
 
async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose Connected");

    const userSchema = new mongoose.Schema({
        email: String,
        password: String,
        googleId: String,
        secret: Array
    });


    userSchema.plugin(passportLocalMongoose);
    userSchema.plugin(findOrCreate);

    console.log(process.env.SECRET);
   

    const User = mongoose.model('User', userSchema);
 
    passport.use(User.createStrategy());
    
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
          });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
    app.get('/', function(req, res) {
        res.render('home');
    });

    app.get("/auth/google",
     passport.authenticate("google", {scope: 
        ['openid', 'email', 'profile']})
    );

    app.get("/auth/google/secrets",
    passport.authenticate("google", {failureRedirect: "/login"}),
    function(req, res) {
        res.redirect("/secrets");
    });
    
    app.get('/login', function(req, res) {
        res.render('login');
    });
    
    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.get('/logout', function(req, res) {
        req.logout(function(err){
            if(!err) {
                res.redirect('/');
            } else {
                console.log(err);
                res.redirect('/');
            }
        });
        
    });

    app.get('/secrets', function(req, res) {
        User.find({"secret": {$ne: null}}, function(err, user) {
          if(err){
            console.error(err);
          } else {
            if(user){
            res.render('secrets' , {usersWithSecrets: user});
            }
          }

        });
    });

    app.get("/submit", function(req, res) {
      if(req.isAuthenticated()) {
          res.render('submit');
      } else {
          res.redirect('/login');
      }
    } );

    app.post("/submit", function(req, res) {
      
      User.findById(req.user.id, function(err, user) {
        if(req.isAuthenticated()){
          User.findById(req.user.id, function(err, user){
            user.secret.push(req.user.secret);
            user.save(function(){
              res.redirect("/secrets")
            });
          });
        } else {
          res.redirect('/login');
        }
      });
    });
    
    app.post('/register', function(req, res) {

        
        User.register({username: req.body.username} ,req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                res.redirect('/register');
            } else {
                console.log(user);
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
            }
        });
       
});

app.post("/login", function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if (err) {
            console.log(err);
            res.redirect('/login');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });

});
    
    
    
    
    app.listen(3000 || process.env.PORT, () => {
        console.log('Server is running on port 3000');
    });



}


