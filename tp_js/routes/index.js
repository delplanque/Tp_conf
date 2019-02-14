var express = require('express');
var router = express.Router();
const axios = require('axios');
const localStorage = require('node-localstorage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/index');

});

/* GET home page. */

router.get('/home', function(req, res, next) {
  res.render('home/index', {conference : req.cookies.confData});
});

router.get('/deco', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login/', function(req, res, next) {
  res.render('login/index');

});

router.get('/register/', function(req, res, next) {
  res.render('register/index');

});


module.exports = router;
