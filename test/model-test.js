var should = require('should'),
  config = require('config'),
  koopserver = require('koop-server')(config); 

global.config = config;

var overlay = '1';

before(function (done) {
  global['Geocommons'] = require('../models/Geocommons.js');
  done();
});

describe('Geocommons Model', function(){


    describe('when finding an overlay', function(){
      before(function(done ){
        // connect the cache
        Cache.db = PostGIS.connect( config.db.postgis.conn );
        done();
      });

      afterEach(function(done){
        done();
      });
    
      /*it('should error when the data are private', function(done){
        Geocommons.find(1, {}, function(err, data){
          should.exist(err);
          should.not.exist(data);
          done();
        });
      });*/

      it('should find a public overlay', function(done){
        Geocommons.find(164880, {}, function(err, data){
          should.not.exist(err);
          should.exist(data);
          done();
        });
      });

    });

});

