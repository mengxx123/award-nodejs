//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $util = require('../util/util.js');
var $sql = require('./cart-sql.js');
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
                    return {
                        update_at: item.update_at,
                        goods: {
                            sum: item.sum,
                            price: item.price,
                            name: item.name,
                            image: item.image,
                            id: item.id,
                            desc: item.desc
                        },
                        item_id: item.item_id,
                        number: item.number,
                        create_at: item.create_at
                    }
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
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;

            let body = req.body
            console.log(body)
            // 建立连接，向表中插入值
            // (`item_id`,`goods_id`,`user_id`,`number`)
            let id = new Date().getTime()
            connection.query($sql.insert, [id, body.goods.id, '1', 1], function(err, result) {
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
    }
}