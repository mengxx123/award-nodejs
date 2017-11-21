module.exports = {
    all: 'select * from `address`',
    getById: 'select * from `address` where `address_id`=?',
    insert:'INSERT INTO `address` (`address_id`,`address`,`gender`,`name`,`tel`, `is_def`) VALUES(?,?,?,?,?,?)',
    updateById:'UPDATE `address` SET `address`=?,`gender`=?,`name`=?,`tel`=?, `is_def`=? WHERE `address_id`=?',
    deleteById: 'delete from `address` where `address_id`=?',
    setDefault: 'UPDATE `address` SET `is_def`=0',
    setDefault2: 'UPDATE `address` SET `is_def`=1 WHERE `address_id`=?'
}