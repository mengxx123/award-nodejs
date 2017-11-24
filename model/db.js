const mysql = require('mysql')
const conf = require('../conf/db.js')
const util = require('../util/util.js')
const pool = mysql.createPool(util.extend({}, conf.mysql))

let connection

let db = {
    query(...rest) {
        return new Promise(function(resolve, reject) {
            if (connection) {
                connection.query(...rest, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            } else {
                pool.getConnection(function (err, conn) {
                    if (err) {
                        reject(err)
                    } else {
                        connection = conn
                        connection.query(...rest, function (err, result) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result)
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = db
