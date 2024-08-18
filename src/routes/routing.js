//Import necessary modules

// File with all the routes

var bodyParser = require('body-parser')
const express = require("express")
const routing = express.Router()
const userObj = require("../service/users")
const userobj = require("../model/admin")
const setup = require("../model/users")



routing.get('/setupdb', function (req, res) {
  setup.setupDb().then((data) => {
    res.send(data)
  }).catch(err => {
    res.status(404)
    res.send("Some Error occured")
  })
})

routing.get('/allData', function (req, res) {
  setup.allData().then((data) => {
    res.send(data)
  }).catch(err => {
    res.status(404)
    res.send("Some Error occured")
  })
})


routing.post('/signup', function (req, res) {
  const adduserObj = new userobj(req.body)
  userObj.addUser(adduserObj).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
});

routing.post('/login', function (req, res) {
  userObj.loginUser(req.body.email, req.body.password).then(data => {
    if (data != null)
      res.send({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
});

routing.post('/checkuser', function (req, res) {
  userObj.checkUser(req.body.email, req.body.password).then(data => {
    if (data != null)
      res.send({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
});

routing.post('/addPlayer', function (req, res) {
  userObj.addPlayer(req.body.name ,req.body.email, req.body.profilePhotoUrl).then(data => {
    console.log(data)
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
});

routing.post('/addMatch', function (req, res) {
  userObj.addMatch(req.body).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
});

routing.post('/profiles/:userId', function (req, res) {
  if(req.params.userId){
  userObj.profiles(req.body.email,req.params.userId).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
}
else{
  res.json({ "error": "Please provide the userId of he player" });
}
});


routing.get('/all/players/:id', function (req, res) {
  // console.log('***',req.params.id)
  if(req.params.id){
  userObj.analytics(req.params.id).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
}
else{
  res.json({ "error": "ID not found" });
}
});


routing.get('/profiles/analytics/:userId/:id', function (req, res) {
  // console.log('***',req.params.id,req.params.userId)
  if(req.params.id,req.params.userId){
  userObj.playerProfile(req.params.id,req.params.userId).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
}
else{
  res.json({ "error": "ID not found" });
}
});


routing.put('/edit/player/profile/:userId/:id', function (req, res) {
  // console.log('***',req.params.id,req.params.userId)
  if(req.params.id,req.params.userId){
  userObj.editPlayerProfile(req.params.id,req.params.userId,req.body).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
}
else{
  res.json({ "error": "ID not found" });
}
});


routing.delete('/delete/player/profile/:userId/:id', function (req, res) {
  // console.log('***',req.params.id,req.params.userId)
  if(req.params.id,req.params.userId){
  userObj.deletePlayerProfile(req.params.id,req.params.userId).then(data => {
    if (data)
      res.json({ "message": data });
  }).catch(err => {
    res.json({ "error": err.message });
  })
}
else{
  res.json({ "error": "ID not found" });
}
});

// Next route to be written


module.exports = routing


