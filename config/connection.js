var mysql = require('mysql');


var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();
// For jawsDB
// var connection;
// if (process.env.JAWSDB_URL) {
//     // DB is JawsDB on Heroku
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     // DB is local on localhost
//     connection = mysql.createConnection({
//         port: 3306,
//         host: 'localhost',
//         user: 'root',
//         password: 'coast',
//         database: 'burgers_db'
//     })
// };


// connection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });

module.exports = connection;