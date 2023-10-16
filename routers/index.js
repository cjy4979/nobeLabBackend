
const express = require('express')//引用express
const router = express.Router()//创建路由实例

router.get('/test_new_api', (req, res) => {
    res.send('received')
})

router.use('/visit', require('./visit'))
router.use('/admin', require('./admin'))
module.exports = router //导出路由实例