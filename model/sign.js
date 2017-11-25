const db = require('./db')
const Sequelize = require('sequelize')

var config = require('../conf/db.js')

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Sign = sequelize.define('tb_sign', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    activityId: Sequelize.STRING(100),
    userId: Sequelize.STRING(100),
    createAt: Sequelize.DATE
}, {
    tableName: 'tb_sign',
    timestamps: false
});

const sql = {
    getAll: "select * from `tb_sign`",
    getByUserId: 'select * from `tb_sign` where `user_id`=?',
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

module.exports = {
    getAll: function (req, res, next) {
        (async () => {
            let result = await Sign.findAll({
                where: {
                    userId: '1',
                    activityId: 2
                }
            })
            res.json({
                code: 0,
                msg: '',
                data: result
            })
        })()
    },
    add: function (req, res, next) {
        // var id = +req.params.id;
        let activityId = '2'
        let userId = '1'

        // select * from ys_sign.tb_sign where to_days(`createAt`) = to_days(now());
        ;(async () => {
            let sign = await Sign.findOne({
                where: {
                    userId: userId,
                    activityId: activityId,
                    $and: [
                        sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('tb_sign.createAt')),'>=',sequelize.fn('TO_DAYS', new Date(2017, 10, 24, 1, 0, 1))),
                        sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('tb_sign.createAt')),'<=',sequelize.fn('TO_DAYS',new Date(2017, 10, 24, 23, 59, 59)))
                    ]
                }
            })
            console.log('findOne')
            console.log(sign)
            if (sign) {
                res.json({
                    code: 1,
                    msg: '不能重复签到'
                })
                console.log('找到了')
                return
            }

            sign = await Sign.create({
                id: '' + new Date().getTime(),
                userId: userId,
                activityId: activityId,
                createAt: new Date()
            })

            res.json({
                code: 0,
                msg: '',
                data: sign
            })
        })()
    },
}