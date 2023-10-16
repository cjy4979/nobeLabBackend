/**
 * @name 访客-实验室简介
 */
const express = require('express')
const router = express.Router()
const intro = require('../../controller/visit/intro')

//
const baseUrl = '/intro'

//获取实验室简介
router.get(baseUrl+'/getIntro',intro.getIntro)

//获取实验室简介的照片
router.get(baseUrl+'/getIntroImages',intro.getIntroImages)


module.exports = router //导出路由实例