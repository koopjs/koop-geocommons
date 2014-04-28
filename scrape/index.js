var request = require('request'),
  moment = require('moment'),
  async = require('async');

//set the overlay id range 
var min = 100,
  max = 110;

// concurrent queue for requests 
var q = async.queue(function (task, callback) {
  // make a request for a page 
  console.log('GET ', task.url);
  var start = moment(new Date());
  request.get(task.url, function(err, data){
    var end = moment(new Date());
    var diff = end.diff(start, 'milliseconds')/1000;
    var json = JSON.parse(data.body);
    if (json && json.features ){
      console.log('\tDone w/', task.id, json.features.length, diff);
    } else {
      console.log('\d Done w/', task.id, 'No features', diff);
    }
    callback();
  });
}, 4);

// add all reqs to the queue
var task;
for (var i = min; i < max; i++){
  task = { 
    url: 'http://localhost:1337/geocommons/' + i, 
    id: i 
  };
  q.push(task, function(err){ if (err) console.log('Err', err); });
};


