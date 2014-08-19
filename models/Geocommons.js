var request = require('request'),
  BaseModel = require('koop-server/lib/BaseModel.js');

function Geocommons( koop ){

  var geocommons = {};
  geocommons.__proto__ = BaseModel( koop );

  geocommons.find = function( id, options, callback ){
    // looks for data in the cache first
    var type = 'Geocommons';
    koop.Cache.get( type, id, options, function(err, entry ){
      if ( err ){
        var url = "http://geocommons.com/overlays/" + id + '.json',
          json = {};

        request.get( url , function( err, data ){
          json.info = JSON.parse( data.body );

          var feature_url = "http://geocommons.com/overlays/" + id + '/features.json';
          request.get( feature_url , function( err, res ){
            try {
              var data = JSON.parse( res.body );
              if ( data.features ){
                json.features = data.features;

                koop.Cache.insert( type, id, json, 0, function( err, success){
                  if ( success ) callback( null, [json] );
                });
              } else {
                callback( 'Error accessing overlay '+id+' ' + JSON.stringify(data), null );
              }
            } catch (e){
              callback( 'Error accessing overlay '+id+' ' + JSON.stringify(data), null );
            }
          });
        });
      } else {
        callback( null, entry );
      }
    });
  };

  return geocommons;
  
};

module.exports = Geocommons;
