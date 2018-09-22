/*数据库驱动*/
const mysql = require('mysql');
//封装数据库操作模块base函数
exports.base = (sql,data,callback)=>{
    //创建一个数据库连接
    const connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '123456',
      database : 'bookmanager'
    });
    //建立数据库连接
    connection.connect();
    
 	connection.query(sql, data,function (error, results, fields) {
    if (error) throw error;
    callback(results);
});
    //结束连接
    connection.end();
}

 /*let sql = 'SELECT * from book where id = ?';
 let data = [4];
base(sql,data,(results)=>{
    console.log(results);
});*/
