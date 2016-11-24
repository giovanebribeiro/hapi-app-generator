'use strict';

var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var assert = require('assert');
var pkg = require('../package.json');

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
            + '  -f, --force    Force the execution, even if project name are not recommended, or project folder is non-empty\n'
            + '\n'
            + '<projectPath> is the path to project folder\n\n'
            assert.equal(out, temp);
            done();
        });
    });
    
    it('\'-h\' option', function(done){
        this.timeout(30000);
        run(['-h'], function(out){
            var temp = 'Usage: hapigen [OPTION] <projectPath>\n'
            + '\n'
            + '  -g, --git      Add .gitignore\n'
            + '  -h, --help     Display this help\n'
            + '  -v, --version  Show the version\n'
            + '  -f, --force    Force the execution, even if project name are not recommended, or project folder is non-empty\n'
            + '\n'
            + '<projectPath> is the path to project folder\n\n'
            assert.equal(out, temp);
            done();
        });
    });
    
    it('\'-v\' option', function(done){
        this.timeout(30000);
        run(['-v'], function(out){
            assert.equal(out, pkg.version + '\n\n');
            done();
        });
    });

    it('\'-hv\' option', function(done){
        this.timeout(30000);
        run(['-hv'], function(out){
            var temp = pkg.version + '\n'
            + '\n'
            + 'Usage: hapigen [OPTION] <projectPath>\n'
            + '\n'
            + '  -g, --git      Add .gitignore\n'
            + '  -h, --help     Display this help\n'
            + '  -v, --version  Show the version\n'
            + '  -f, --force    Force the execution, even if project name are not recommended, or project folder is non-empty\n'
            + '\n'
            + '<projectPath> is the path to project folder\n\n';
            assert.equal(out, temp);
            done();
        });
    });

    it("invalid project name", function(done){
        run(['iajdsncijansdc:ashdchb:'], function(out){
            var temp = '* Invalid project name:\n'
            + '\n'
            + '>> name can only contain URL-friendly characters\n\n';
            assert.equal(out, temp);
            done();
        });
    });

    it("project name not recommended", function(done){
        run(['inValiD-packA4ge-Name'], function(out){
            var temp = '* Project name not recommended (To use this name anyway, use the \'-f\' option):\n'
            + '\n'
            + '++ name can no longer contain capital letters\n\n';
            assert.equal(out, temp);
            done();
        });
    });

    it("check if all files exist after project creation", function(done){
      run(['foo'], function(out){
        var temp = 
      })
    })


});
