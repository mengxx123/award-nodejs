var good={
    // 查
    all: 'select * from `tb_user`',
    insert:'INSERT INTO `tb_user` (`user_id`,`user_name`,`phone`,`industry`) VALUES(?,?,?,?)',
}

module.exports=good;