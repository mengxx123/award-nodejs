// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: 'localhost', 
        user: 'root2',
        password: '123456',
        database:'ys_sign', // 前面建的user表位于些数据库中
        port: 3306,
        debug: true
    }
};
