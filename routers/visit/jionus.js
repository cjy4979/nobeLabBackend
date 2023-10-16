/**
 * @name 访客-新闻页
 */
const express = require('express')
const router = express.Router()
const jionus = require('../../controller/visit/jionus')

//
const baseUrl = '/recruit'

//获取新闻列表
router.get(baseUrl + '/getRecruitList', jionus.getRecruitList)

//获取新闻详情
router.get(baseUrl + '/getRecruitByType', jionus.getRecruitByType)


module.exports = router //导出路由实例