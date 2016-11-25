# hapi-generator [![Build Status](https://travis-ci.org/giovanebribeiro/hapi-app-generator.svg?branch=master)](https://travis-ci.org/giovanebribeiro/hapi-app-generator) [![npm version](https://badge.fury.io/js/hapi-app-generator.svg)](https://badge.fury.io/js/hapi-app-generator) [![david dm](https://david-dm.org/giovanebribeiro/hapi-app-generator.svg)(https://david-dm.org)]

[![NPM](https://nodei.co/npm/hapi-app-generator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hapi-app-generator/)

Another [Hapi.js](http://hapijs.com/) app generator (command line), with tests, [ESLint](http://eslint.org/) support and modular structure.

## Installation
```
# npm install -g hapi-app-generator
```

## Options
```
Usage: hapigen [OPTION] <projectPath>

  -g, --git      Add .gitignore
  -h, --help     Display this help
  -v, --version  Show the version  
  -f, --force    Force the execution, even if project name are not recommended, or project folder is non-empty

<projectPath> is the path to project folder
```

Expected result:
```
$ hapigen foo
*** Init process
* Create project folder
* Copy README.md
* Copy index.js
* Copy .eslintrc
* Create package.json
* Create 'src' folder structure
* Copy src/manifest.json
* Copy src/modules/hello/index.js
* Copy src/modules/hello/actions/hello.js
* Create 'test' folder
* Copy test/hello.test.js
*** Process finished successfully. To run the project, execute the commands:
***
*** $ npm install
*** $ npm start
***
*** This project have the 'debug' module. To activate:
***
*** $ DEBUG=foo:* npm start
***
*** This project also have tests (with eslint). To run:
***
*** $ npm test
```
