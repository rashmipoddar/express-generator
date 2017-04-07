var express = require('express');
var router = express.Router();
var CronJob = require('cron');
var request = require('request');

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/etnewsDb');

var newsSchema = mongoose.Schema({
  success: Boolean,
  count: Number,
  current_page: Number,
  feeds: [{
    id: String,
    feed_id: Number,
    publisher: String,
    category_id: Number,
    sub_category_id: Number,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    js_path: String,
    thumbnail_image_path: String,
    published_at: String,
    created_at: String
  }]
});

newsModel = mongoose.model('news', newsSchema);

var cronJob = CronJob.job("* */2 * * * *", function(){
  request('http://asiatrotter.org:5111/api/economictimes/all-news/', function(error, response, body) {
    //console.log('error: ', error);
    //console.log('statusCode: ', response.statusCode);
    //console.log('body: ', body);
    var reqData = JSON.parse(body);
    var data = reqData.data;
    var feed = data.feed;
    //console.log(data.success);
    //console.log(data.count);
    //console.log(data.current_page);
    newsModel.create({success: "true", count: 1, current_page: 1, feeds: [{
      id: 1, feed_id: 1, publisher: "John", category_id: 1, sub_category_id: 1,
      author: "john", title: "news1", description: "news1", url: "sdjl", urlToImage: "uewo",
      js_path: "dsk", thumbnail_image_path: "sdsd", published_at: "2017-04-06T04:00:00.000Z",
      created_at: "2017-04-07T09:02:00.826Z"
    }] }, function(err, results) {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
      }
    });
  });
  console.log("Record created");
});
cronJob.start();

module.exports = router;
