const express = require('express')
const router = express.Router()

router.get('/activities/:id', function (req, res, next) {
    goodlist.goodById(req, res, next)
})

module.exports = router
