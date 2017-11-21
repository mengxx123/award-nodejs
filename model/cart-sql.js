module.exports = {
    all: 'select * from `cart_item` left join `good` on `cart_item`.goods_id = `good`.id',
    insert:'INSERT INTO `cart_item` (`item_id`,`goods_id`,`user_id`,`number`) VALUES(?,?,?,?)',
    deleteById: 'delete from `cart_item` where `item_id`=?'
}