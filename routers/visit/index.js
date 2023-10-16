/**
 * @name 访客入口路由
 */
const express = require('express')//引用express
const router = express.Router()//创建路由实例

router.use(require('./home'))
router.use(require('./intro'))
router.use(require('./achievements'))
router.use(require('./news'))
router.use(require('./teams'))
router.use(require('./jionus'))
router.use(require('./instruments'))


module.exports = router //导出路由实例