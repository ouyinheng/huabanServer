const pool = require('./pool')

function login(data) {
    sql = "select * from wechat_user where username='"+data.username+"' and password='"+data.password+"'";
	return pool.execute(sql);
}

module.exports = {
    login
}