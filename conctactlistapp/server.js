
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

(function() {
  'use strict';

   $rootScope.$on('$routeChangeSuccess', function(event, current) {
     $scope.currentLink = getCurrentLinkFromRoute(current);
   });
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res){
	db.contactlist.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res){
  db.contactlist.insert(req.body, function (err, doc){
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res){
  var id = req.params.id;
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res){
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res){
  var id = req.params.id;
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, description: req.body.email, price: req.body.number, rating: req.body.number, seller: req.body.number, warranty: req.body.number}},
    new: true}, function (err, doc){
      res.json(doc);
  });
});

app.listen(3000);
console.log("app at port 3000");