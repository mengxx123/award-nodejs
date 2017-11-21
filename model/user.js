//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $util = require('../util/util.js');
var $sql = require('./user-sql.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    getAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.all, function (err, result) {
                jsonWrite(res, {
                    code: 0,
                    msg: '',
                    data: result
                })
                connection.release()
            })
        })
    },
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;

            let body = req.body
            // 建立连接，向表中插入值
            let id = '' + new Date().getTime()
            connection.query($sql.insert, [id, body.user_name, body.phone, body.industry], function(err, result) {
                if(result) {
                    jsonWrite(res, {
                        code: 0,
                        msg: '修改成功'
                    });
                } else {
                    jsonWrite(res, {
                        code: 1,
                        msg: '修改失败'
                    });
                }

                // 释放连接
                connection.release();
            });
        });
    },
}