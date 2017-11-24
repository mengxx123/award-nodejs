var express = require('express')
var router = express.Router()

const user = require('../model/user')
const award = require('../model/award')
const activity = require('../model/activity')
const sign = require('../model/sign')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
let i = 0
router.get('/count', function(req, res, next) {
    i++
    res.send('这是测试数据' + i)
})

router.get('/err', function(req, res, next) {
    undefinedFunction()
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

router.get('/activities/:id', function (req, res, next) {
    activity.goodById(req, res, next)
})

router.get('/signs', function(req, res, next) {
    sign.getAll(req, res, next)
})

router.post('/signs', function(req, res, next) {
    sign.add(req, res, next)
})

module.exports = router;
