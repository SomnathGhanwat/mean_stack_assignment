'use strict';

const { Moment } = require('../Controller/moment');
const {User}  = require('../Controller/user');




/**
 * use : this array for use all routes store.
 */



const common_array = [
  
     {
        method:"POST",
        path:"/signup",
        options:User.signup()
    },
    {
        method:"POST",
        path:"/login",
        options:User.login()
    },
    {
        method:"GET",
        path:"/user",
        options:User.showAllUser()
    },



    {
        method:"POST",
        path:"/moment",
        options:Moment.newMoment()
    },
    {
        method:"GET",
        path:"/allmoment",
        options:Moment.ShowAllMoment()
    },
    {
        method:"PUT",
        path:"/updateMoment/{id}",
        options:Moment.updateMomentData()
    },
    {
        method:"DELETE",
        path:"/deleteMoment/{id}",
        options:Moment.deleteMomentData()
    },






]




module.exports = {
    common_array
}