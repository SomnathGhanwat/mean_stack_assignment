'use strict';
const { Moment } = require('../Model/moment');
const { Promise } = require('es6-promise');

const FS = require('fs');
const { request } = require('http');

let uploadFile = (data) => {

    const filename = data.hapi.filename;

    let data_path;
    console.log("Directoey",__dirname)
    FS.writeFile(__dirname + '/upload/' + filename, data._data, (err, data) => {
        if (err) {
            throw err;

        } else {
            data_path = __dirname + '/upload/' + filename
        }
    });

    return __dirname + '/upload/' + filename;
}

let addMoment = (request) => {
    const promise = new Promise((resolve, reject) => {
        let shop = {};
        let image;
        if(request.payload.moment_image) {
            image = uploadFile(request.payload.moment_image)
        }

        console.log("Image",image)
        let create_data = {
            user_id: request.payload.user_id,
            title : request.payload.title,
            tags  :request.payload.tags,
           
            moment_image: image
        }

        Moment.momentModel.findOne({
            user_id: request.payload.user_id,
            tags  :request.payload.tags,
            comment : request.payload.comment,
            moment_image: image 
        },(err,data) => {
            if(err) {
                reject(err);
            } else {
                if(data) {
                    let response_object = {
                        status_code : 409,
                        message : "Conflict",
                    }
                    resolve(response_object);
                } else {

                    Moment.momentModel.create(create_data, (err, data) => {
                        if (err) {
                            reject(err);
                            console.log("Error Occour", err);
                        } else {
                    
                           
                    
                            let response_object = {
                                status_code :200,
                                message: "New Moment Created"
                            };
                            resolve(response_object);
                        }
                    })
                }
            }
        })
      
    });
    return promise;
}



let allMoment = () => {
    const promise = new Promise((resolve, reject) => {
        Moment.momentModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let response_object = {
                    status_code: 200,
                    message: "all Moment",
                    results: data
                };
                resolve(response_object);
            }
        })
    });
    return promise;
}

let deleteMoment = (request) => {

    const promise = new Promise((resolve,reject) => {
        Moment.momentModel.deleteOne({"_id" : request.params.id} ,(err,data) => {
            if(err) {
                reject(err);
            } else {
                let response_object = {
                    status_code : 200,
                    message : "Moment Deleted Successfully"
                };
                resolve(response_object);
            }
        })
    });
    return promise;
}


let updateMoment = (request) => {
    const promise = new Promise((resolve,reject) => {

        let image;
        if(request.payload.moment_image) {
            image = uploadFile(request.payload.moment_image)
        }

        let create_data = {
            user_id: request.payload.user_id,
            title : request.payload.title,
            tags  :request.payload.tags,
            comment : request.payload.comment,
            moment_image: image
        }


        Moment.momentModel.updateOne({
            "_id" : request.params.id   
        },
        {
            $set : create_data
        },
        (err,data) => {
            if(err) {
                reject(err);
            } else {
                let response_object = {
                    status_code : 200,
                    message :"Moment Updated Successfully"
                };
                resolve(response_object);
            }
        }
        )
    });
    return promise;
}






module.exports.Moment = {
    addMoment,
    allMoment,
    deleteMoment,
    updateMoment
    
}