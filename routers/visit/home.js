/**
 * @name 访客首页
 */

const express = require('express')
const router = express.Router()
const home = require('../../controller/visit/home')

//
const baseUrl = '/home'

//获取走马灯
router.get(baseUrl + '/getCarousel', home.getCarousel)

//获取实验室简介
router.get(baseUrl + '/getIntro', home.getIntro)

//获取新闻列表
router.get(baseUrl + '/getNewsList', home.getNewsList)

//获取招聘列表
router.get(baseUrl + '/getRecruitList', home.getRecruitList)

//获取科研成果
router.get(baseUrl + '/getAchievementsPic', home.getAchievementsPic)

module.exports = router //导出路由实例