'use strict';

const Hapi = require("@hapi/hapi");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision')
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const HapiSwagger = require('hapi-swagger');
const HapiCookie = require("@hapi/cookie")
const {Path} = require('path');

const {common_array} = require('../src/Route/common');

const checkSession = (decoded,request) => {
    let timestamp = new Date().getTime(),
        diff = timestamp - decoded['lastlogin'],
        max_diff = 15*60*1000,
        is_valid = diff > max_diff;
      

    console.log("Decoded the token",decoded);
    console.log("Current timestamp",timestamp );
    console.log("Difference in milliseconds ",(timestamp - decoded['lastlogin']));
    console.log('diff > max_diff: ', !is_valid);
    return {isValid: !is_valid};
};

const node = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 4000,
        routes: {
            cors: true,
          
        }   
    })

    await server.register(Inert);
    await server.register(Vision);
    await server.register(HapiAuthJwt2);
    await server.register(HapiSwagger);
   

    


    
    
    

    server.auth.strategy('jwt', 'jwt', {
        key: '!*(*SECRET*@*@',
        validate: checkSession,
        verifyOptions: {algorithms: ['HS256']}
    });

    server.state('testCookie', {
        ttl: 1000 * 60 * 60 * 24,
        isSecure: false,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: false,
       strictHeader: true,   
    });
    //server.auth.default('jwt')




    for (const route in common_array) {
        server.route(common_array[route])
    }
   
    
    await server.start();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    return server;
}


module.exports = node;