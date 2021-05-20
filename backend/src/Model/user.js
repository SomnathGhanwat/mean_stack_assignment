'use strict'
const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

let userSchema = new Mongoose.Schema({
    email : { type : String, required : true, index: { unique : true}},
    fullname: { type: String},
    city : {type: String},
    role: {
         type:String,
         default: "master",
         enum:["master","admin","user"] 
    },
    password: { type: String, required:true},
    cookies: { type: Object},
    lastlogin : { type : Date},

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
{ strict: false }

)
autoIncrement.initialize(Mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'User');
const UserModel = Mongoose.model("User",userSchema,"User");

module.exports.User = {
    UserModel
};