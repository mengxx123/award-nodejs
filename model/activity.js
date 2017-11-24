var mysql = require('mysql')
var $conf = require('../conf/db.js')
var $util = require('../util/util.js')
var pool = mysql.createPool($util.extend({}, $conf.mysql))

const sql = {
    getAll: "select * from `tb_activity`",
    getById: 'select * from `tb_activity` where `id`=?',
    insert:'INSERT INTO `tb_award` (`id`,`user_name`,`phone`, `activity_id`, `content`) VALUES(?,?,?,?,?)',
    deleteByActivityId: 'delete from `tb_award` where `activity_id`=?'
}

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

function generateUUID() {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0
        d = Math.floor(d/16)
        return (c=='x' ? r : (r&0x3|0x8)).toString(16)
    })
    return uuid
}

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
    goodById: function (req, res, next) {
        var id = +req.params.id // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query(sql.getById, id, function(err, result) {
                if (err) {
                    res.json({
                        code: '500',
                        msg: '系统出错'
                    })
                    connection.release()
                    return
                }
                res.json({
                    code: 0,
                    msg: '',
                    data: result[0]
                })
                connection.release()
            })
        })
    },

    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            let body = req.body
            // 防止领奖
            connection.query(sql.getByPhone, body.phone, function(err, result) {
                if (result.length) {
                    jsonWrite(res, {
                        code: 2,
                        msg: '您已经领奖过了',
                        data: result[0]
                    })
                    connection.release()
                    return
                }
                console.log('处理抽奖逻辑')
                // 处理抽奖逻辑
                let award = false
                if (body.phone === '15602221234') {
                    // 方便调试
                    award = true
                } else if (count > 10 && awardCount === 0) {
                    // 保证前 10 有一个
                    award = true
                } else if (count >= 30 && awardCount === 1) {
                    // 防止送不出
                    award = true
                } else if (award === 2) {
                    // 一共有两个奖品
                    award = false
                } else {
                    // 10% 的概率会抽到
                    if (Math.random() * 100 < 10) {
                        award = true
                    } else {
                        award = false
                    }
                }
                console.log('处理抽奖逻辑2' + award)

                console.log('插入数据')
                // 建立连接，向表中插入值
                console.log('生成ID')
                let id = generateUUID()
                console.log(id)
                connection.query(sql.insert, [id, body.user_name, body.phone, '1', award ? '1' : '0'], function(err, result) {
                    if (err) {
                        jsonWrite(res, {
                            code: 3,
                            msg: '系统出错'
                        })
                        return
                    }

                    // 释放连接
                    if (!award) {
                        jsonWrite(res, {
                            code: 1,
                            msg: '谢谢参与'
                        })
                    } else {
                        jsonWrite(res, {
                            code: 0,
                            msg: '恭喜中奖'
                        })
                    }
                    connection.release()
                })
            })
        })
    },
    deleteAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var id = +req.params.id
            console.log('删除啦啦')
            console.log(id)
            connection.query(sql.deleteByActivityId, '1', function (err, result) {
                console.log(err)
                if (result.affectedRows > 0) {
                    jsonWrite(res, {
                        code: 0,
                        msg: ''
                    })
                } else {
                    console.log('删除失败')
                    console.log(err)
                    jsonWrite(res, {
                        code: 0,
                        msg: err
                    })
                }

                connection.release()
            })
        })
    }
}