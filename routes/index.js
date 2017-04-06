var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/genDb');

var bookSchema = mongoose.Schema({
  name: String,
  fav_book: String
});

bookModel = mongoose.model('book', bookSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'title': 'The homepage'});
});

router.post('/newEntry', function(req, res) {
  console.log(req.body);
  var name = req.body.name;
  var fav_book = req.body.fav_book;

  bookModel.find({ "name": name}, function(err, results) {
    if (err) {
      console.error(err);
    } else if (results.length === 0) {
      bookModel.create({ name: name, fav_book: fav_book });
      if (err) {
        console.error(err);
      } else {
        res.status(201).send('Created & Saved');
      }
    } else {
      res.send("Duplicate entry not permitted");
    }
  });
});

router.get('/list', function(req, res) {
  bookModel.find({}, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(results);
    }
  });
});

router.put('/:name', function(req, res) {
  name = req.params.name;
  fav_book= req.body["fav_book"];

  bookModel.find({ "name": name}, function ( err, results) {
    if (err) {
      console.log(err);
    } else {
      bookModel.update({ "fav_book": fav_book || results[0].fav_book }, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.send("Updated");
        }
      });
    }
  });

  router.delete('/:name', function(req, res){
  name = req.params.name;
  bookModel.remove( { "name": name }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted");
    }
  });
});

});
module.exports = router;
