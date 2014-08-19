var should = require('should'),
  request = require('supertest'),
  config = require('config'),
  koop = require('koop-server')(config),
  kooplib = require('koop-server/lib');

before(function(done){
  var provider = require('../index.js');
  model = new provider.model( kooplib );
  controller = new provider.controller( model );
  koop._bindRoutes( provider.routes, controller );
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
/*
    describe('/FeatureServer', function() {
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
*/
});

