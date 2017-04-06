var express = require('express');
var router = express.Router();

var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
var request = require('request');

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/etnewsDb');

// var newsSchema = mongoose.Schema({
//   feeds: [{
//     id: String,
//     feed_id: Number,
//     publisher: String,
//     category_id: Number,
//     author: String,
//     title: String,
//     description: String,
//     url: String,
//     urlToImage: String,
//     js_path: String,
//     thumbnail_image_path: String,
//     published_at: String,
//     created_at: String
//   }]
// });

// newsModel = mongoose.model('news', newsSchema);

router.get('/', function(req, res) {
  request('http://asiatrotter.org:5111/api/economictimes/all-news/', function(error, response, body) {
    //console.log('error: ', error);
    //console.log('statusCode: ', response.statusCode);
    //console.log('body: ', body);
    var reqData = JSON.parse(body);
    var feeds = reqData.data.feeds;
    //console.log('Required data part is: ', feeds);
    db.collection('newsdata').save(reqData, function(err, records) {
      if(err) {
        console.error(err);
      } else {
        console.log('Record added');
      }
    });
  });
  // var cronJob = cron.job("*/10 *  * * * *", function(){ console.log('i am awesome'); });
  // cronJob.start();
  // var job = new CronJob({
  //   cronTime: '*/2 * * * * ',
  //   onTick: autoGet()
  // });
  //
  // job.start();
  res.send('Got data successfully');
})

function autoGet() {
  console.log('Cron scheduling works');
  router.get('/', function(req, res) {
    request('http://asiatrotter.org:5111/api/economictimes/all-news/', function(error, response, body) {
      //console.log('error: ', error);
      //console.log('statusCode: ', response.statusCode);
      //console.log('body: ', body);
      var feeds = reqData.data.feeds;
      //console.log('Required data part is: ', feeds);
      db.collection('newsdata').save(reqData, function(err, records) {
        if(err) {
          console.error(err);
        } else {
          console.log('Record added');
        }
      });

    });
    res.send('This is running every 2 mins');
  })
}




// var mailOptions = {
// 		from: 'rashmi.poddar2017',
// 		to: req.body.email_id,
// 		subject: 'Hello',
// 		text: 'There is an update in the news feed.'
// 	};
// 	transporter.sendMail(mailOptions, function(err, info) {
// 		if(err) {
// 			console.log('The error is ', err);
// 			res.sendStatus(400);
// 		} else {
// 			console.log('Message sent: ', info.response);
// 			res.sendStatus(200);
// 		}
// 	});
//
//   var transporter = nodemailer.createTransport({
//   	service: 'Gmail',
//   	auth: {
//   		user: 'rashmi.poddar2017@gmail.com',
//   		pass: 'rashmipoddar2017'
//   	}
//   });

module.exports = router;
