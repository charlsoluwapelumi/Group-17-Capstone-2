const mysql = require('mysql');

// mysql connection

const dbConn = mysql.createConnection({
    hosts: 'localhost',
    user: 'root',
    password: '',
    database: 'apexhauz'
});

dbConn.connect(function (error) {
    if (error) throw error;
      console.log('Database Connected Successfully!!!');  
});

module.exports = dbConn;