'use strict';

const {Moment} = require('../Factory/moment');

let newMoment = () => {
    return {
        auth :'jwt',
        handler : (request,h) => {
            let response = Moment.addMoment(request);
            return response.then((value) => {

                return value;
            }).catch((err) => {
                console.log("Error" , err);
                return err;
                
            })
        }
    }
}

let ShowAllMoment = () => {
    return {
      
        handler : (request,h) => {
            let response = Moment.allMoment();
            return response.then((value) => {
                return value;
            }).catch((err) => {
                return err;
            })
        }
    }
}



let updateMomentData = () => {
    return {
       
        auth : 'jwt',
      
        handler : (request,h) => {
            let response = Moment.updateMoment(request);
            return response.then((value) => {
                return value;
            }).catch((err) => {
               
                return err;
            })
        }
    }
}


let deleteMomentData = () => {
    return {
      

        auth :'jwt',
        handler : (request,h) => {
            let response = Moment.deleteMoment(request);
            return response.then((value) => {
                return value;
            }).catch((err) => {
               
                return err;
            })
        }
    }
}

module.exports.Moment = {
   newMoment,
   ShowAllMoment,
   updateMomentData,
   deleteMomentData
}