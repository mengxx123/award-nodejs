// conf/db.js
// MySQL数据库联接配置

let env = process.env.NODE_ENV || 'production'
env = env.toLowerCase()
console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)
console.log('Load config: [%s]', env)

let mysql

if (process.env.NODE_ENV === 'production') {
    mysql = {
        debug: true,
        host: '120.78.177.9',
        user: 'root',
        password: 'Yunser123-',
        database:'ys_sign',
        port: 3306
    }
} else {
    mysql = {
        debug: true,
        host: 'localhost',
        user: 'root',
        password: '123456',
        database:'ys_sign',
        port: 3306
    }
}

module.exports = {
    mysql
}
