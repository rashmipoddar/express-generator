var express = require('express');
var router = express.Router();
var CronJob = require('cron').CronJob;

router.get('/', function(req, res) {
  var cronJob = cron.job("*/10 *  * * * *", function(){ console.log('i am awesome'); });
  cronJob.start();
  res.send('working');
});

module.exports = router;
