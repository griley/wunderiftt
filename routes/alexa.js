var express = require('express');
var WunderList = require('../models/wunderlist');
var router = express.Router();
var _ = require('lodash');

router.param('list', function(req, res, next, value){
  req.wunderlistListItem = WunderList.findListByAlexaName(value);
  next();
});

router.post('/lists/:list', function(req, res, next) {
  WunderList.addTaskToList(
    req.wunderlistListItem.id,
    {
      'title': _.trim(
        req.body.task.title + ' ' + _.join(req.wunderlistListItem.tags,' ')
      )
    }
  );
  res.sendStatus(200);
});

module.exports = router;
