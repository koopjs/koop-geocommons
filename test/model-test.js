var should = require('should'),
  config = require('config'),
  koop = require('koop-server/lib');

before(function (done) {
  koop.Cache.db = koop.PostGIS.connect( config.db.postgis.conn );
  Geocommons = new require('../models/Geocommons.js')( koop );
  done();
});

var overlay = '1';


describe('Geocommons Model', function(){


    describe('when finding an overlay', function(){
      before(function(done ){
        // connect the cache
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

