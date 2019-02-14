var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    
    res.render('admin/index', {conference : req.cookies.confData});
  
  });

  router.get('/create', function(req, res, next) {
    res.render('createConf/index');
  
  });

  router.get('/details/:id', function(req, res, next) {
    let idConf = req.params.id

    res.render('details/index' , {participants : req.cookies.confData[idConf].participants});
  
  });

  router.post('/create', function(req, res, next) {
    let conference = []

    const nomConf = req.body.title
    const descrConf = req.body.descr
    const dateConf = req.body.date
    const debutConf = req.body.heuredebut
    const finConf = req.body.heurefin

    conference = req.cookies.confData
    conference.push({title : nomConf, description : descrConf, date : dateConf, debutConf : debutConf, finConf : finConf , participants:[]})
    res.cookie("confData", conference);
    res.redirect('/admin/');
  
  });


module.exports = router;