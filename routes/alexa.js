var express = require('express');
var WunderList = require('../models/wunderlist');
var router = express.Router();
var _ = require('lodash');

router.use('/lists', function(req, res, next) {
  var taskTitle = req.body.task.title;
  var hashIndex = taskTitle.indexOf('hash tag');
  if (hashIndex != -1)  {
    var hashtag = taskTitle.substr(hashIndex + 9).trim();
    req.wunderlistListItem = WunderList.findListByName(hashtag);
    req.taskTitle = taskTitle.substr(0, hashIndex);
  }
  else {
    req.taskTitle = req.body.task.title;
  }
  next();
});

router.param('list', function(req, res, next, value){
  if (req.wunderlistListItem === undefined) {
    req.wunderlistListItem = WunderList.findListByName(value);
  }
  next();
});

router.post('/lists/:list', function(req, res, next) {
  if (req.wunderlistListItem !== undefined) {
    WunderList.addTaskToList(
      req.wunderlistListItem.id,
      {
        'title': _.trim(
          req.taskTitle + ' ' + _.join(req.wunderlistListItem.tags,' ')
        )
      }
    );
  }
  res.sendStatus(200);
});

module.exports = router;
