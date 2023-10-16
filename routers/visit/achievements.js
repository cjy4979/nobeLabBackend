/**
 * @name 访客-科研成果-【未开发】
 */
const express = require('express')
const router = express.Router()
const intro = require('../../controller/visit/intro')

//
const baseUrl = '/achievements'

//获取实验室简介
router.get(baseUrl+'/get',intro.getIntro)

//获取实验室简介的照片
router.get(baseUrl+'/getIntroImages',intro.getIntroImages)


module.exports = router //导出路由实例