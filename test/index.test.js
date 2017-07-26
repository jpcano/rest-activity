var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
var server = require('../src/index');

chai.use(chaiHttp);

describe('rest-activity', function() {
    describe('/GET github', function () {
        it('should get the github activity', function(done) {
            chai.request(server)
                .get('/github')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(Number(process.env.npm_package_config_ghCount));
                    done();
            });
        });
    });

    describe('/GET twitter', function () {
        it('should get the twitter activity', function(done) {
            chai.request(server)
                .get('/twitter')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(Number(process.env.npm_package_config_twCount));
                    done();
                });
        });
    });

    describe('/GET invalid route', function () {
        it('should get the github activity', function(done) {
            chai.request(server)
                .get('/github/randomroute')
                .end(function(err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });

});