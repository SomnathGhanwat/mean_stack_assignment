'use strict';

const Promise = require('es6-promise')
const { User } = require('../Model/user')
const Bcrypt = require('bcrypt');
const moment  = require('moment');
const jwt  = require('jsonwebtoken');
const { resolve } = require('bluebird');
let userSignUp = (request,h) => {

    console.log("Request Payload => ", request.payload,request.state.testCookie);

    let user_data = {
        email: request.payload.email,
        city: request.payload.city,
        password:request.payload.password,
        fullname: request.payload.fullname,
        cookies : request.state.testCookie
    
    };

    const promise = new Promise((resolve, reject) => {
        User.UserModel.findOne({
            email: request.payload.email,
            password: request.payload.password,
         
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            if (data) {
                console.log("Data", data);
                let response_object = {
                    status_code: 409,
                    message: "Conflict",
                    result: "User Already Exits"
                }

                resolve(response_object);

            } else {
                User.UserModel.create(user_data, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        let response_object = {
                            status_code: 200,
                            message: "Created",
                            result: "User Signup SuccessFully"
                        }
                        resolve(response_object);
                    }
                })
            }
        })
    })
    return promise;
}

let userLogin = (request) => {

    console.log("Login Request Payload => ", request.payload);
    //  const salt =  Bcrypt.genSalt(20);
    // let encryted_test =  Bcrypt.hash(request.payload.password,salt)
   
    const promise = new Promise((resolve, reject) => {
        User.UserModel.findOne({
            email: request.payload.email,
            password: request.payload.password


        }, (err, success) => {
             if(err) {
                 reject(err);
             } else {
                 if(success) {
                    let lastlogintime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    let token = jwt.sign(
                        {
                            email: success.email,
                            password: success.password,
                            role: success.role,
                            lastlogin: lastlogintime
                        }, '!*(*SECRET*@*@');

                        let response_object = {
                            status_code : 200,
                            message : "User Login Successfully",
                            user_id : success.user_id,
                            accessToken : token,
                            result : success
                        };
                        resolve(response_object);
                 } else {
                    let response_object = {
                        status_code : 200,
                        message : "please signup",
                      
                    };
                    resolve(response_object);
                 }
             }
            
        })
    });
    return promise;

}


/*
   User.RoleModel.findOne({ name: success.role }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                      console.log("Data",data);
                     if(data) {
                            let lastlogintime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                            let token = jwt.sign(
                                {
                                    email: success.email,
                                    mobile: success.mobile,
                                    role: success.role,
                                    lastlogin: lastlogintime
                                }, '!*(*SECRET*@*@');

                                
                            let update_data = {
                                email: success.email,
                                mobile: success.mobile,
                                password: success.password,
                                role: success.role,
                                permission: data,
                                lastlogin: lastlogintime,
                                accessToken : token,
                                cookies : request.state.testCookie
                            }
                            User.UserModel.findByIdAndUpdate({ "_id": success._id }, update_data, (err, data) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (data) {
                                        console.log("Data",data)
                                        let response_object = {
                                            statusCode: 200,
                                            message: "User Login Successfully",
                                            token: data.token,
                                            role: data.role,
                                            result: data
                                        }
                                        resolve(response_object)
                                    } else {

                                        let response_object = {
                                            statusCode: 200,
                                            message: "Username and password not exit",
                                           result :" User not exits"
                                        };
                                        resolve(response_object);
                                    }
                                }
                            })
                        }

                       
                    }
                })
*/

let getAllUser = () => {
    const promise = new Promise((resolve,reject)=> {
        User.UserModel.find({} ,(err,data) => {
            if(err) {
                reject(err);
            } else {
                let response_object = {
                    statusCode : 200,
                    message:"Show all user",
                    result : data
                };
                resolve(response_object)
            }
        })
    });
    return promise;
}

module.exports.User = {
    userSignUp,
    userLogin,
    getAllUser
}