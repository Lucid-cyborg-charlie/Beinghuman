var express = require('express');
var router = express.Router();
var model = require('../model/model');

const cookieSession = require('cookie-session');



var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieSession({secret: 'code-secret'}));


/*******************************************    middlewares   **************************************/



var off = function(req, res, next){
  if(req.session.user == undefined){
    res.locals.off = "true";
  }
  next();
}



var on = function(req, res, next){
  if(req.session.user !== undefined){
    res.locals.on = "true";
  }
  next();
}



var canPost = function(req, res, next){
  if(req.session.user !== null){
    next();
  }else res.send("REQUIERE TO BE CONNECTED");
  
}




/*******************************************    GET   **************************************/


/* GET home page. */
router.get('/', on, off,function(req, res, next) {
  res.render('index');
});



/* return actualities*/
router.get('/actuality',on, off, function(req, res, next) {
  var results = model.displayNews();
  res.render('actuality', results);
})



// return orphan informations page 
router.get('/orphan',on, off, function(req, res, next) {
  res.render('orphans');
})




/* add user */
router.get('/signup',on, off, function(req, res) {
  res.render('signup_form');
})




/*  log in. */
router.get('/login', on, off, function(req, res) {
  res.render('login_form');
})



router.get('/logout', function(req, res){
  req.session = null;
  res.redirect('/');
})



/* Formular to report an orphan */
router.get('/report',on, off, function(req, res){
  if(req.session.user !== undefined){
    res.render('report');
  }
  else res.send('REQUIERE TO BE CONNECTED');
})


// add user testimony
router.get('/setTestimony', on, off, (req, res) =>{
  if(req.session.user !== undefined){
    res.render('setTestimony');
  }
  else res.send('REQUIERE TO BE CONNECTED');

})


// return all testimony page
router.get('/testimony',on, off, (req, res) =>{
  res.render('testimony', model.testimony());
})



// return testimony
router.get('/userTestimony:id', on, off, (req, res) =>{
  res.render('userTestimony', model.selectTestimony(req.params.id)[0]);
})


// return an article
router.get('/info:id',on , off, (req, res) =>{
  res.render('info', model.selectNews(req.params.id)[0]);

})







module.exports = router;
