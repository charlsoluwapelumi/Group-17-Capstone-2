const mysql = require('mysql');

// mysql connection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'charmingcharls',
    database: 'apexhauz'
});

connection.connect(function (err) {
    if (err) throw err;
      console.log('Database Connected Successfully!!!');  
});

module.exports = connection;