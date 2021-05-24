'use strict'
const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
let momentSchema = new Mongoose.Schema({
    user_id : {
        type:Mongoose.Schema.Types.Number,
        ref :"User"
    },
    moment_image : { type : String, required : true, index: { unique : true}},
    tags: { type: String},
    title : {type : String},

},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
{ strict: false }
)

autoIncrement.initialize(Mongoose.connection);
momentSchema.plugin(autoIncrement.plugin, 'Moment');
const momentModel = Mongoose.model("Moment",momentSchema,"Moment");

module.exports.Moment = {
    momentModel
};