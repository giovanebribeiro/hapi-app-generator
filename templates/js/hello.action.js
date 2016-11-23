'use strict';

var boom = require('boom');
var Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/hello/{name}',
    config: {
        description: 'A dummy action to demonstrate how this module works... If \'name\' equals to \'error\': BOOM!!',
        validate:{
            params:{
                name: Joi.string().required()
            },
            query:{
                anotherName: Joi.string().optional()
            }
        },
        handler: function(request, reply){
            var name = request.params.name;
            var anotherName = request.query.anotherName || '';

            if(name === 'error'){
                return reply(boom.badImplementation('This message will appear in log: BOOM!!!'));
            }

            return reply('It Works!! Congratulations '+ name + ' ' + anotherName+'!!');
        }
    }
};
