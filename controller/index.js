extend = require('node.extend'),
  crypto = require('crypto');

// inherit from base controller
var Controller = extend( {}, BaseController );


Controller.provider = true;
 
Controller.index = function(req, res){
    res.render(__dirname + '/../views/index');
};

Controller.find = function(req, res){
    function send( err, data ){
        if ( err ){
          res.json( err, 500 );
        } else { 
          if ( data ){
            if ( req.query.topojson ) {
              Topojson.convert( data[0], function( err, topology){
                res.json( topology );
              });
            } else { 
              res.json( data[0] );
            }
          } else {
            res.send('There a problem accessing this overlay', 500);
          }
        }
    };
    if ( req.params.id ){
      var id = req.params.id;
      var d = {};
      Geocommons.find( id, req.query, function( err, data) {
        if (req.params.layer !== undefined && data[req.params.layer]){
          //d = data[req.params.layer];
          send( err, data[req.params.layer] );
        } else if ( !req.params.layer ) {
          send( err, data );
        } else {
          send( 'Layer not found', null);
        }
      });
    } else {
      res.send('Must specify a user and geocommons id', 404);
    }
};

Controller.featureservice = function(req, res){
    var callback = req.query.callback;
    delete req.query.callback;

    if ( req.params.id ){
      var id = req.params.id;
      Geocommons.find( id, req.query, function( err, data) {
        delete req.query.geometry;
        Controller._processFeatureServer( req, res, err, data, callback);
      });
    } else {
      res.send('Must specify an id', 404);
    }

};

Controller.preview = function(req, res){
    res.render(__dirname + '/../views/demo', { locals:{ id: req.params.id } });
};

module.exports = Controller;
