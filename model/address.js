//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $util = require('../util/util.js');
var $sql = require('./address-sql.js');
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
                result = result.map(item => {
                    item.is_def = item.is_def === 1
                    return item
                })
                jsonWrite(res, {
                    code: 0,
                    msg: '',
                    data: result
                })
                connection.release()
            })
        })
    },
    getById: function (req, res, next) {
        var id = +req.params.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function (err, connection) {
            connection.query($sql.getById, id, function (err, result) {
                let address
                if (result.length) {
                    address = result[0]
                    address.is_def = address.is_def === 1
                } else {
                    address = null
                }
                jsonWrite(res, {
                    code: 0,
                    msg: '',
                    data: address
                });
                connection.release()
            });
        });
    },
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;

            let body = req.body
            // 建立连接，向表中插入值
            // (`address_id`,`address`,`gender`,`name`,`tel`, `is_def`)
            let id = new Date().getTime()
            connection.query($sql.insert, [id, body.address, body.gender, body.name, body.tel, body.is_def ? 1 : 0], function(err, result) {
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
    deleteById: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var id = +req.params.id;
            console.log('删除啦啦')
            console.log(id)
            connection.query($sql.deleteById, id, function (err, result) {
                console.log(err)
                console.log(result)
                if (result.affectedRows > 0) {
                    jsonWrite(res, {
                        code: 0,
                        msg: ''
                    });
                } else {
                    console.log('删除失败')
                    console.log(err)
                    jsonWrite(res, {
                        code: 0,
                        msg: err
                    });
                }

                connection.release();
            });
        });
    },
    updateById: function (req, res, next) {
        // 为了简单，要求同时传name和age两个参数
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.params;
            let body = req.body
            console.log('更新')
            console.log(req.query, req.params)
            console.log(param.id, param.name)
            // 建立连接，向表中插入值
            // `address`=?,`gender`=?,`name`=?,`tel`=?, `is_def`=? WHERE `address_id`=?'
            connection.query($sql.updateById, [body.address, body.gender, body.name, body.tel, body.is_def ? 1 : 0, param.id], function(err, result) {
                if(result) {
                    jsonWrite(res, {
                        code: 0,
                        msg: '修改成功'
                    });
                } else {
                    jsonWrite(res, {
                        code: 1,
                        msg: '修改失败',
                        data: result
                    });
                }

                // 释放连接
                connection.release();
            });
        });
    },
    setDefault: function (req, res, next) {
        // 为了简单，要求同时传name和age两个参数
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.params;
            let body = req.body
            console.log('修改默认')
            let id = req.params.id
            console.log(id)
            // 建立连接，向表中插入值
            // `address`=?,`gender`=?,`name`=?,`tel`=?, `is_def`=? WHERE `address_id`=?'
            connection.query($sql.setDefault, function(err, result) {
                if(result) {
                    connection.query($sql.setDefault2, id, function(err, result) {
                        if(result) {
                            jsonWrite(res, {
                                code: 0,
                                msg: '修改成功'
                            });
                            // 释放连接
                            connection.release();
                        } else {
                            jsonWrite(res, {
                                code: 1,
                                msg: '修改失败',
                                data: result
                            });
                            // 释放连接
                            connection.release();
                        }
                    });
                } else {
                    jsonWrite(res, {
                        code: 1,
                        msg: '修改失败',
                        data: result
                    });
                    // 释放连接
                    connection.release();
                }


            });
        });
    }
}