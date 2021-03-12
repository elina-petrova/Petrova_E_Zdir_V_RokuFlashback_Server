const creds = require("./userConnfig");
const sql = require('mysql');

//pull the info from userConnfig.js
//we want to obscure them a bit for security
//normally we would be saved in an .env file
//and then read in at /create time

const connection = sql.createPool({
    connectionLimit: 10,
    host: creds.host,
    user: creds.user,
    password: creds.password,
    database: creds.database
});

module.exports = connection;