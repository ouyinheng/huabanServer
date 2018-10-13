const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'wechat'
});

function test() {
    connection.query(
        'SELECT * FROM `wechat_user`', 
        function(err, results, fields) {
            // console.log(err); // results contains rows returned by server
            console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}

module.exports = {
    test
}