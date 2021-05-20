'use strict';
const { User } = require('../Factory/user');




let signup = () => {
    return {

        state: {
            parse: true,
            failAction: 'error'
        },
   
        handler: (request, h) => {
            let response = User.userSignUp(request);
            return response.then((value) => {
                h.state('testCookie', {
                    ttl: 1000 * 60 * 60 * 24,
                    encoding: 'base64json',
                    username: "Somnath"
                });
                return value;
            }).catch(err => {
                return err;
            })
        }
    }
}

let login = () => {
    return {
      
        handler : (request , h) => {
        
            console.log("Gert cookiues",request.state.testCookie)
            let response = User.userLogin(request);
            return response.then((value) => {
                return value;
            }).catch(err => {
                return err;
            })

        }
    }
}
let showAllUser = () => {
    return {
        tags: ['api',"Show All User"],
        description:"Show All User",
        handler : (request , h) => {
            let response = User.getAllUser();
            return response.then((value) => {
                return value;
            }).catch(err => {
                return err;
            })

        }
    }
}

module.exports.User = {
    login,
    signup,
    showAllUser
}