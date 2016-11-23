# hapi-generator
Another [Hapi.js](http://hapijs.com/) app generator, with tests and modular structure.

## Installation
```
# npm install -g hapi-app-generator
```

## Options
```
Usage: hapigen [OPTION] <projectName>

  -g, --git      Add .gitignore
  -h, --help     Display this help
  -v, --version  Show the version

<projectName> is the path to project folder
```

Expected result:
```
$ ./hapi-app-generator/bin/hapi-generator foo
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
