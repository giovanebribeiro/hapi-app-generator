'use strict';

var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var assert = require('assert');

var tempPath;
describe('>>> hapi-app-generator tests <<<', function(){

    before(function(done){
        this.timeout(10000);

        tempPath = path.join(__dirname, 'temp');
        mkdirp(tempPath, 755, function(err){
            if(err) throw err;
            done();
        });
    });

    after(function(done){
        this.timeout(10000);
        
        rimraf(tempPath, function(err){
            if(err){ throw err; }
            done();
        });
    });

    function run(args, callback){
        var out = '';
        var cmd = spawn(__dirname+'/../bin/hapi-generator', args);

        cmd.stdout.on('data', function(data){
            out += data + '\n';
        });

        cmd.stdout.on('end', function(){
            callback(out);
        });
    }

    it('no arguments', function(done){
        this.timeout(30000);
        run([], function(out){
            var temp = 'Invalid project name.\n'
            + '\n'
            + 'Usage: hapigen [OPTION] <projectPath>\n'
            + '\n'
            + '  -g, --git      Add .gitignore\n'
            + '  -h, --help     Display this help\n'
            + '  -v, --version  Show the version\n'
            + '\n'
            + '<projectPath> is the path to project folder\n\n'
            assert.equal(out, temp);
            done();
        });
    });
});
