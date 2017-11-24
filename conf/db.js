// conf/db.js
// MySQL数据库联接配置

let env = process.env.NODE_ENV || 'production'
env = env.toLowerCase()
console.log('Load config: [%s]', env)

let mysql
let apiDomain

if (process.env.NODE_ENV === 'production') {
    mysql = {
        debug: true,
        host: 'localhost',
        user: 'root',
        password: 'Yunser123-',
        database:'ys_sign',
        port: 3306
    }
    apiDomain = 'http://120.78.177.9:3000'
} else {
    mysql = {
        debug: true,
        host: 'localhost',
        user: 'root',
        password: '123456',
        database:'ys_sign',
        port: 3306
    }
    apiDomain = 'http://localhost:3000'
}

module.exports = {
    apiDomain,
    mysql
}
