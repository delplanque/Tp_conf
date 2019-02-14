var express = require('express');
var router = express.Router();
const axios = require('axios');


const users = [
  {
    user : "admin",
    password : "admin"
  },
  {
  user : "jordan",
  password : "azerty"
},
{
  user : "valentin",
  password : "azerty"
},
{
  user : "romain",
  password : "azerty"
}
]

const conference = [
  {
    title : "Conférence information",
    description : "Sujet javascript",
    date: "23/01/2019",
    debutConf: "13h",
    finConf: "15h",
    participants:[users[1]]
  },
  {
    title : "Conférence Médecine",
    description : "Maladie",
    date: "23/01/2019",
    debutConf: "15h",
    finConf: "16h",
    participants:[users[2]]
}
]

router.post('/connect', (req, res, next) => {
    if(req.cookies.userData === null){
      res.cookie("userData", users);
      res.cookie("confData", conference);
    }


    let user =  req.body.user;
    let password =  req.body.password;
    let isOk= false;
    let isAdmin = false;
    

    if( user === "admin" && password === "admin"){
      isAdmin = true
    }
    else{
      for (let i=0; i< users.length;i++){
        let u = users[i].user
        let mdp = users[i].password
  
        if( u === user && mdp === password){
          res.cookie("userActif", i);
          isOk = true
        }
      } 
    }

   
    console.log(isAdmin)
    if(isAdmin){
      res.redirect('/admin');
    }else if( isOk ){
      res.redirect('/home');
    }
    else{
      res.redirect('/register');
    }
    
})

router.post('/create', (req, res, next) => {
  let user = req.body.user;
  let password = req.body.password;
  let isUse = false

  console.log(users)
  for (let i=0; i< users.length;i++){
    let u = users[i].user
    if( u === user){
      isUse = true
    }
  }

  if(!isUse){
    users.push( { user : user, password : password})
    res.cookie("userData", users);
    res.redirect('/home');
  } else{
    res.redirect('/register');
  }


})

router.get('/subConf/:id', (req, res, next) => {
  let id = req.params.id;
  let isInConf = false

  user = req.cookies.userData
  conferences = req.cookies.confData
  userActif = req.cookies.userActif

  let parts = conferences[id].participants
  for (let i=0; i< parts.length;i++){
    let u = parts[i].user
    let mdp = parts[i].password

    if( u === user[userActif].user && mdp === user[userActif].password){
      isInConf = true
    }
  } 
  if(!isInConf){
    conferences[id].participants.push(user[userActif])
    res.cookie("confData", conferences);
  }


  res.redirect('/home');

})

router.get('/desubConf/:id', (req, res, next) => {
  let id = req.params.id;
  let isInConf = false
  console.log('here')
  user = req.cookies.userData
  conferences = req.cookies.confData
  userActif = req.cookies.userActif

  let test = 0

  let parts = conferences[id].participants
  for (let i=0; i< parts.length;i++){
    let u = parts[i].user
    let mdp = parts[i].password

    if( u === user[userActif].user && mdp === user[userActif].password){
      test = i
      isInConf = true
    }
  } 
  if(isInConf){
    conferences[id].participants.splice(test,1)
    res.cookie("confData", conferences);
  }


  res.redirect('/home');

})

module.exports = router;