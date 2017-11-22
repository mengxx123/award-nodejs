var express = require('express');
var router = express.Router();

var goodlist = require('../model/goodlist.js')
const category = require('../model/category')
const address = require('../model/address')
const user = require('../model/user')
const award = require('../model/award')
const cart = require('../model/cart')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
let i = 0
router.get('/count', function(req, res, next) {
    i++
    res.send('这是测试数据' + i)
})

router.get('/about', function(req, res, next) {
    res.render('about', { title: '关于我们' })
})

router.get('/users', function(req, res, next) {
    user.getAll(req, res, next)
})

router.post('/users', function(req, res, next) {
    user.add(req, res, next)
})

router.delete('/users', function(req, res, next) {
    user.deleteAll(req, res, next)
})

router.get('/awards', function(req, res, next) {
    award.getAll(req, res, next)
})

router.post('/awards', function(req, res, next) {
    award.add(req, res, next)
})

router.delete('/awards', function(req, res, next) {
    award.deleteAll(req, res, next)
})

router.get('/banners',function(req,res,next){
    goodlist.bannerAll(req,res,next);
})

router.get('/goodses', function(req, res, next) {
    goodlist.goodAll(req, res, next)
})

router.get('/goodses/:id', function(req, res, next) {
    goodlist.goodById(req, res, next)
})

router.get('/categories',function(req,res,next){
    category.getAll(req,res,next)
})

router.get('/addresses', function (req, res, next) {
    address.getAll(req, res, next);
})

router.get('/addresses/:id', function(req, res, next) {
    address.getById(req, res, next)
})

router.post('/addresses', function (req, res, next) {
    address.add(req, res, next)
})

router.put('/addresses/:id', function(req, res, next) {
    address.updateById(req, res, next)
})

router.post('/addresses/default/:id', function(req, res, next) {
    address.setDefault(req, res, next)
})

router.delete('/addresses/:id', function(req, res, next) {
    address.deleteById(req, res, next)
})

router.get('/carts', function (req, res, next) {
    cart.getAll(req, res, next)
})

router.post('/carts', function (req, res, next) {
    cart.add(req, res, next)
})

router.delete('/carts/:id', function(req, res, next) {
    cart.deleteById(req, res, next)
})

//增
router.get('/goodAdd',function(req,res,next){
    goodlist.goodadd(req,res,next);
});

//删
router.get('/goodDel',function(req,res,next){
    goodlist.gooddelete(req,res,next);
});
//改
router.get('/goodUpdate',function(req,res,next){
    goodlist.goodupdate(req,res,next);
});
//查
router.get('/goodAll',function(req,res,next){
    goodlist.goodAll(req,res,next);
});
router.get('/goodById',function(req,res,next){
    goodlist.goodById(req,res,next);
});



module.exports = router;
