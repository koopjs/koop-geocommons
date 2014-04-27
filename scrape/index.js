var request = require('request'),
  async = require('async');

//set the overlay id range 
var min = 1,
  max = 100;

// concurrent queue for requests 
var q = async.queue(function (task, callback) {
  // make a request for a page 
  console.log('GET ', task.url);
  request.get(task.url, function(err, data){
    console.log('\tDone w/', task.id);
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


