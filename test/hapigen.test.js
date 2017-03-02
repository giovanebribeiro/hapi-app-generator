'use strict';

var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var assert = require('assert');
var pkg = require('../package.json');
var fs = require('fs');
var async = require('async');

var tempPath;
describe('>>> hapi-app-generator tests <<<', function(){
    before(function(done){
        this.timeout(10000);
        tempPath = path.join(__dirname, 'temp');
        mkdirp(tempPath, function(err){
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
            out += data;
        });

        cmd.stdout.on('end', function(){
            callback(out);
        });
    }

    it('no arguments', function(done){
        this.timeout(30000);
        run([], function(out){
            var temp = 'Invalid project name.\n'
            + 'Usage: hapigen [OPTION] <projectPath>\n'
            + '\n'
            + '  -g, --git      Add .gitignore\n'
            + '  -h, --help     Display this help\n'
            + '  -v, --version  Show the version\n'
            + '  -f, --force    Force the execution, even if project name are not recommended, or project folder exists\n'
            + '\n'
            + '<projectPath> is the path to project folder\n';
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
          + '  -f, --force    Force the execution, even if project name are not recommended, or project folder exists\n'
          + '\n'
          + '<projectPath> is the path to project folder\n'
          assert.equal(out, temp);
          done();
      });
  });
  
  it('\'-v\' option', function(done){
      this.timeout(30000);
      run(['-v'], function(out){
          assert.equal(out, pkg.version + '\n');
          done();
      });
  });

  it('\'-hv\' option', function(done){
      this.timeout(30000);
      run(['-hv'], function(out){
          var temp = pkg.version + '\n'
          + 'Usage: hapigen [OPTION] <projectPath>\n'
          + '\n'
          + '  -g, --git      Add .gitignore\n'
          + '  -h, --help     Display this help\n'
          + '  -v, --version  Show the version\n'
          + '  -f, --force    Force the execution, even if project name are not recommended, or project folder exists\n'
          + '\n'
          + '<projectPath> is the path to project folder\n';
          assert.equal(out, temp);
          done();
      });
  });

  it("invalid project name", function(done){
      run(['iajdsncijansdc:ashdchb:'], function(out){
          var temp = '* Invalid project name:\n'
          + '>> name can only contain URL-friendly characters\n';
          assert.equal(out, temp);
          done();
      });
  });

  it("project name not recommended", function(done){
      run(['inValiD-packA4ge-Name'], function(out){
          var temp = '* Project name not recommended (To use this name anyway, use the \'-f\' option):\n'
          + '++ name can no longer contain capital letters\n';
          assert.equal(out, temp);
          done();
      });
  });

  it("check if all files exist after project creation", function(done){
    run([path.join(tempPath, 'foo')], function(out){
      var temp = "*** Init process\n" +
        "* Check if folder is available\n" +
        "* Create project folder\n" +
        "* Copy README.md\n" +
        "* Copy index.js\n" +
        "* Copy .eslintrc\n" +
        "* Create package.json\n" +
        "* Create 'src' folder structure\n" +
        "* Copy src/manifest.json\n" +
        "* Copy src/modules/hello/index.js\n" +
        "* Copy src/modules/hello/actions/hello.js\n" +
        "* Create 'test' folder\n" +
        "* Copy test/hello.test.js\n" +
        "Process finished successfully. To run the project, execute the commands:\n" +
        "\n" +
        "$ cd foo\n" +
        "$ npm install\n" +
        "$ npm start\n" +
        "\n" +
        "This project have the 'debug' module. To activate:\n" +
        "\n" +
        "$ DEBUG=foo:* npm start\n" +
        "\n" +
        "This project also have tests (with eslint). To run:\n" +
        "\n" +
        "$ npm test\n";
      assert.equal(out, temp);

      async.series([
          function(callback){
            fs.access(path.join(tempPath, "foo"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "README.md"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "package.json"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src", "manifest.json"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src", "modules"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src", "modules", "hello"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src", "modules", "hello", "index.js"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src", "modules", "hello", "actions"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "src", "modules", "hello", "actions", "hello.js"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "test"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
          
          function(callback){
            fs.access(path.join(tempPath, "foo", "test", "hello.test.js"), function(err){
              if(err) return callback(err);
              return callback(null);
            });
          },
      ], function(err){
        assert.ifError(err);
        done();
      });
    });
  });

  it("create a project in an existent folder, without the 'force' option", function(done){
    run([path.join(tempPath, 'foo')], function(out){
      var temp = "*** Init process\n" +
        "* Check if folder is available\n" +
        "+ Directory already exists. If you still want to use this directory, invoke the '-f' option.\n";
      assert.equal(out, temp);
      done();
    });
  });

  it("create a project in an existent folder, with the 'force' option", function(done){
    run(['-f', path.join(tempPath, 'foo')], function(out){
      var temp = "*** Init process\n" +
        "* Check if folder is available\n" +
        "* Create project folder\n" +
        "* Copy README.md\n" +
        "* Copy index.js\n" +
        "* Copy .eslintrc\n" +
        "* Create package.json\n" +
        "* Create 'src' folder structure\n" +
        "* Copy src/manifest.json\n" +
        "* Copy src/modules/hello/index.js\n" +
        "* Copy src/modules/hello/actions/hello.js\n" +
        "* Create 'test' folder\n" +
        "* Copy test/hello.test.js\n" +
        "Process finished successfully. To run the project, execute the commands:\n" +
        "\n" +
        "$ cd foo\n" +
        "$ npm install\n" +
        "$ npm start\n" +
        "\n" +
        "This project have the 'debug' module. To activate:\n" +
        "\n" +
        "$ DEBUG=foo:* npm start\n" +
        "\n" +
        "This project also have tests (with eslint). To run:\n" +
        "\n" +
        "$ npm test\n";
      assert.equal(out, temp);
      done();
    });
  });

  it("use the 'git' option", function(done){
    run(['-g', path.join(tempPath, 'bar')], function(out){
      fs.access(path.join(tempPath, "bar", ".gitignore"), function(err){
        assert.ifError(err);
        done();
      });
    });
  });

  
});
