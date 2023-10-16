/**
 * @name 管理员-招聘页
 */
const express = require('express')
const router = express.Router()
const auth = require('../../middleWare/auth')
const jionus = require('../../controller/admin/jionus')

//
const baseUrl = '/recruit'

//获取招聘列表
router.get(baseUrl + '/getRecruitList', jionus.getRecruitList)

//获取招聘详情
router.get(baseUrl + '/getRecruitByType', jionus.getRecruitByType)

//添加招聘
router.post(baseUrl + '/addRecruitByType', auth, jionus.addRecruitByType)

//更新招聘
router.post(baseUrl + '/updateRecruitByType', auth, jionus.updateRecruitByType)


module.exports = router //导出路由实例