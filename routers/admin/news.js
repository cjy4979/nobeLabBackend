/**
 * @name 管理员-新闻页
 */
const express = require('express')
const router = express.Router()
const auth = require('../../middleWare/auth')
const news = require('../../controller/admin/news')

//
const baseUrl = '/news'

//获取新闻列表
router.get(baseUrl + '/getNewsList', news.getNewsList)

//获取新闻详情
router.get(baseUrl + '/getNewsByPaperId', news.getNewsByPaperId)

//添加新闻
router.post(baseUrl + '/addNewsByPaperId', auth, news.addNewsByPaperId)

//更新新闻
router.post(baseUrl + '/updateNewsByPaperId', auth, news.updateNewsByPaperId)

//删除新闻
router.delete(baseUrl + '/deleteNewsByPaperId', auth, news.deleteNewsByPaperId)

module.exports = router //导出路由实例