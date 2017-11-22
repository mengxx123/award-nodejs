module.exports = {
    getAll: 'select * from `tb_user`',
    getByPhone: 'select * from `tb_user` where `phone`=?',
    insert:'INSERT INTO `tb_user` (`user_id`,`user_name`,`phone`,`industry`, `activity_id`) VALUES(?,?,?,?,?)',
    deleteByActivityId: 'delete from `tb_user` where `activity_id`=?'
}