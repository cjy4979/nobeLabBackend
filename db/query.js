const mysql = require('mysql')//引入数据库模块

//创建数据库连接池
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "yourName",
    password: "yourPass",
    database: "yourdb"
})




exports.query=(sql)=>{
    return new Promise(function (resolve, reject){
        //创建链接
        db.getConnection((err, connection)=>{
            connection.query(sql, function(err,data){
                connection.release()//数据库操作完毕，释放连接，节省资源
                if(err){
                    console.log(err);
                    return
                }
                resolve(data)
            })
        })
    })
}

exports.queryData=(sql,data)=>{
    return new Promise(function (resolve, reject){
        //创建链接
        db.getConnection((err, connection)=>{
            connection.query(sql,data, function(err,data){
                if(err){
                    connection.rollback();
                    console.log(err);
                    return
                }
                connection.commit();
                resolve(data)
                connection.release()//数据库操作完毕，释放连接，节省资源
            })
        })
    })
}