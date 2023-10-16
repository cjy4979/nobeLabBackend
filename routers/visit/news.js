/**
 * @name 访客-新闻页
 */
const express = require('express')
const router = express.Router()
const news = require('../../controller/visit/news')

//
const baseUrl = '/news'

//获取新闻列表
router.get(baseUrl + '/getNewsList', news.getNewsList)

//获取新闻详情
router.get(baseUrl + '/getNewsByPaperId', news.getNewsByPaperId)


module.exports = router //导出路由实例