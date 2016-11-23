'use strict';

var hapi = require('hapi');
var code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var expect = code.expect;
var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;

var server;
experiment('Test module: hello', function(){

    before(function(done){
        server = new hapi.Server();
        server.connection();
        server.register([
            { register: require('../src/modules/hello') }
        ], function(err){
            if(err) { throw err; }
            done();
        });
    });

    after(function(done){
        server = null;
        done();
    });

    test('hello: correct arguments, without query', function(done){
        var request = {
            method: 'GET',
            url: '/hello/giovane'
        };
        server.inject(request, function(response){
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.equal('It Works!! Congratulations giovane !!');
            done();
        });
    });
    
    test('hello: correct arguments, with query', function(done){
        var request = {
            method: 'GET',
            url: '/hello/giovane?anotherName=boaviagem'
        };
        server.inject(request, function(response){
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.equal('It Works!! Congratulations giovane boaviagem!!');
            done();
        });
    });

    test('hello: demonstrate boom object', function(done){
        var request = {
            method: 'GET',
            url: '/hello/error'
        };
        server.inject(request, function(response){
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

});
