//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $util = require('../util/util.js');
var sql = require('./user-sql.js');
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
            connection.query(sql.getAll, function (err, result) {
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
            let body = req.body
            // 防止重复签到
            pool.getConnection(function(err, connection) {
                connection.query(sql.getByPhone, body.phone, function(err, result) {
                    if (result.length) {
                        jsonWrite(res, {
                            code: 2,
                            msg: '您已经签到过了'
                        })
                        connection.release();
                        return
                    }

                    // 建立连接，向表中插入值
                    let id = '' + new Date().getTime()
                    connection.query(sql.insert, [id, body.user_name, body.phone, body.industry, '1'], function(err, result) {
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
            });
        });
    },
    deleteAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var id = +req.params.id;
            console.log('删除啦啦')
            console.log(id)
            connection.query(sql.deleteByActivityId, '1', function (err, result) {
                if (err) {
                    console.log('删除失败')
                    console.log(err)
                    jsonWrite(res, {
                        code: 0,
                        msg: err
                    });
                } else {
                    console.log(result)
                    jsonWrite(res, {
                        code: 0,
                        msg: ''
                    });
                }

                // if (result.affectedRows > 0) {
                //
                // } else {
                //
                // }

                connection.release();
            });
        });
    }
}