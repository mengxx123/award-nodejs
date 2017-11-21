var good={
	//增
	goodinsert:'INSERT INTO `good` (`id`,`name`,`desc`,`price`,`sum`) VALUES(0,?,?,?,?)',
	//删
	gooddelete: 'delete from good where id=?',
	//改
	goodupdate:'UPDATE `good` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?',
    //查
    all: 'select * from category',
    goodById: 'select * from good where id=?',
    getAllBanner: 'select * from banner'
}

module.exports=good;