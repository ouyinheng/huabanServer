const mysql = require('mysql2');
let pool = global.pool;
if(!pool) {
    pool = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'wechat'
    });
    global.pool = pool;
}
function getConnection(){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,conn){
        if(!err){
            resolve(conn);
        }else {
            reject(err);
        }
        });
    })
}
function execute(sql){
    return new Promise((resolve,reject)=>{
        let connection;
        getConnection().then((coon)=>{
        connection = coon;
        coon.query(sql,(err,results)=>{
            if(!err){
            resolve(results);
            } else {
            reject(err);
            }
        });
        }).catch((err)=>{
        reject(err);
        }).finally(()=>{
        if(connection){
            connection.release();
        }
            // console.log("释放完成");
        });
    });
}
  
module.exports = {
    getConnection,
    execute
}