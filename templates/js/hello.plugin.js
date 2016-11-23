'use strict';

exports.register = function(server, options, next){
    // put here your actions. Obviously, this is a suggestion. :D
    server.route(require('./actions/hello.js'));

    next();
};

exports.register.attributes = {
    pkg: {
        'name': 'Hello plugin',
        'description': 'A dummy plugin with a small sugestion of how to implement your app funcionalities in a clean way'
    }
};
