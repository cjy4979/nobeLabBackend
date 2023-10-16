/**
 * @name 首页信息管理
 */

const express = require('express')
const router = express.Router()
const user = require('../../controller/admin/user')
const auth = require('../../middleWare/auth')

const baseUrl = '/user'

//登录
router.post(baseUrl + '/login', user.login)

//注册
router.post(baseUrl + '/register', user.register)

//登出
router.post(baseUrl + '/logout', user.logout)

router.get(baseUrl + '/getLogin', auth, (req, res) => {
    res.status(200).send({
        success: true,
        status: 200
    })
})

module.exports = router //导出路由实例