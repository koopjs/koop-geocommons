var should = require('should'),
  request = require('supertest'),
  config = require('config'),
  koop = require('koop-server')(config);

global.config = config;

before(function (done) {
    Cache.db = PostGIS.connect( config.db.postgis.conn );
    try { koop.register(require("../index.js")); } catch(e){ console.log('Error require ../index', e); }
    //console.log(koop)
    done(); 
});

describe('Koop Routes', function(){

    describe('/geocommons/103', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/geocommons/104')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('/geocommons/blarg/', function() {
      it('should return 404', function(done) {
        request(koop)
          .get('/geocommons/blarg')
          .end(function(err, res){
            res.should.have.status(404);
            done();
        });
      });
    });

    describe('/geocommons/preview', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/geocommons/preview')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

    describe('FeatureServer', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/geocommons/104/FeatureServer')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

    describe('/FeatureServer/0', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/geocommons/104/FeatureServer/0')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

    describe('/FeatureServer/0/query', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/geocommons/103/FeatureServer/0/query')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

});

