'use strict';

const mongo = require('./server/mongo');
const node = require('./server/node');


node().then(server => {
    console.log("Node Server Started Successfully")
});

mongo();