var config = require('../config')
var _ = require('lodash');
var util = require('util');
var WunderlistSDK = require('wunderlist');


function WunderList() { }

WunderList.api = new WunderlistSDK({
  'accessToken': config.wunderlist.accessToken,
  'clientID':    config.wunderlist.clientId
});

WunderList.listMapping = [
  { name: 'shopping', id: 131628923, tags: ['#alexa', '#grocery'] },
  { name: 'todo',     id: 130110831, tags: ['#alexa', '#test'] }
];

WunderList.findListByAlexaName = function(listName) {
  var listItem;
  listItem = _.find(
    this.listMapping,
    function(obj) { return obj.name == listName; }
  );
  return listItem;
};

WunderList.addTaskToList = function(listId, task_data = {}) {
  var args = _.merge({'list_id': listId}, task_data);
  this.api.http.tasks.create(args)
    .done(function(task) {
      console.log('Task added:' + task.id);
    })
    .fail(function(err) {
      console.error('Eror occurred in addTaskToList' + util.inspect(err));
    });
};

module.exports = WunderList;
