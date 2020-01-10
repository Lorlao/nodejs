var express = require('express');
var router = express.Router();

//les noms de variables sont prédéfinis et obligatoires pour ce driver
const ObjectId = require('mongodb').ObjectId;
const dbConnection=require('../dbConnection');/* GET users listing. */

router.get('/login', function(req, res, next) {
  res.render('connection');
});
//pour afficher la page de formulaire

//POUR QUE LE BOUTON DECONNEXION FONCTIONNE
router.get('/logout', function(req, res, next) {
  req.session.destroy(function (err){
    res.redirect('/')
  });
});

router.post('/login', function(req, res, next) {  
  
  console.log('tries to login')
  console.log(req.body)
  //permet de récupérer les infos du formulaire en post sans passer par du JS  
  
  dbConnection(function(db){
    db.collection('users').findOne({
      email:req.body.email,
      password:req.body.password
    },null, function(err, user){
        if(user!==null){
          req.session.me =user 
          res.redirect('/')
        }else{
          res.redirect('/users/login')
          //plutôt que res.render car ça évite de recharger toutes les variables associées
        } 
      })
  })
});

module.exports = router;
