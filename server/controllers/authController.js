var passport = require('passport');
var bcrypt = require('bcrypt-node');
var db = require('../db/config');

var util = require('../config/utils');
var User = require('../db/models/user');
var Users = require('../db/collections/users');

module.exports = {

  login: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    },
    post: function (req, res) {

      res.status(200).send("Login successful");

      // var username = req.body.username;
      // var password = req.body.password;
      // User.forge({username: username}).fetch()
      // .then(function(model){
      //   if (!model) {
      //     res.status(401).send("User not found");
      //   }
      //   bcrypt.compare(password, model.get('password'), function(err, result){
      //     if (err){
      //       res.status(500).send("Error logging in user");
      //     }
      //     if (result === false){
      //       res.status(401).send("Incorrect password");
      //     }
      //     if (result === true){

      //       util.createSession(req, res, model);
      //       res.status(200).send("Login successful");
      //     }
      //   });
      // });
      
    }
  },

  signup: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    },
    post: function (req, res) {
      var username = req.body.username;
      var password = req.body.password;
      bcrypt.hash(password, null, null, function(err, hash){
        if (err){
          console.log("Error creating user: ", err);
        }
        User.forge({username: username, password: hash}).save()
        .then(function(model){

          util.createSession(req, res, model);
          res.status(200).send(model);
        });
      });
    }
  },

  loggedIn: {
    get: function(req, res){
      if (req.isAuthenticated()){
        res.status(200).send(req.user);
      } else {
        res.status(401).send("User not logged in");
      }
    },

    post: function(){
      res.status(400).send("Bad request");
    }
  },

  logout: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    },
    post: function (req, res) {
      // req.logOut();

      req.session.destroy(function(err) {
        if (err) {
          console.log('Error destroying session: ', err);
          res.status(200).send('Session ended');
        }
      });
    }
  }

};
