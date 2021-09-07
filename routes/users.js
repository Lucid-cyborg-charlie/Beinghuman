var express = require('express');
var router = express.Router();
var app = express();

const cookieSession = require('cookie-session');


var model = require('../model/model');



var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieSession({secret: 'code-secret'}));





/*******************************************    Post   **************************************/

// login of user
router.post('/connexion', (req, res)=>{
  var id = model.Check_login(req.body.mail, req.body.password);
  if(id !== -1){
    req.session.user = id;
    res.redirect('/');
  }
  else if(id == -1){
    res.send("PARAMETRES NON VALIDES");
  }

})


// add an user
router.post('/new', (req, res)=>{
  var Check_params = model.Check_login(req.body.mail, req.body.password);

  if(Check_params == -1){
    var id = model.add_user(req.body.mail, req.body.password, req.body.country);
    req.session.user = id;
    res.redirect('/');
  }
  else if(Check_params !== - 1){
    res.send("PARAMETRES NON VALIDES");
  }
})


//  add orphan reported
router.post('/reported', function(req, res){
  function processString(str) {
    if(str == undefined) return str;
    return str.replace(/(?:\r\n|\r|\n)/g, '\n');
  }
  
  model.report(req.session.user, processString(req.body.description), req.body.country, req.body.city, req.body.date, req.body.name, req.body.firstName, req.body.adress);
  res.redirect('/report');
  
})




// add commentary with testimony id
router.post('/commentary', function(req, res){

  function processString(str) {
    if(str == undefined) return str;
    return str.replace(/(?:\r\n|\r|\n)/g, '\n');
  }

  model.add_commentary(req.body.id, req.body.name, processString(req.body.description));
  res.redirect('/userTestimony'+ req.body.id);
})




// add testimony 
router.post('/addTestimony', (req, res) =>{
  function processString(str) {
    if(str == undefined) return str;
    return str.replace(/(?:\r\n|\r|\n)/g, '\n');
  }

  model.add_Testimony(req.body.name, processString(req.body.description));

  res.redirect('/setTestimony');

})




module.exports = router;
