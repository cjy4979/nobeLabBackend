/**
 * @name 访客-科研团队
 */

const express = require('express')
const router = express.Router()
const teams = require('../../controller/visit/teams')

//
const baseUrl = '/teams'

//获取老师列表
router.get(baseUrl + '/getTeachers', teams.getTeachers)

//获取老师列表
router.get(baseUrl + '/getTeachersByTitle', teams.getTeachersByTitle)

//获取老师详细介绍
router.get(baseUrl + '/getTeacherByUid', teams.getTeacherByUid)

//获取学生列表
router.get(baseUrl + '/getStudents', teams.getStudents)

//获取过往学生列表
router.get(baseUrl + '/getGraduated', teams.getGraduated)


module.exports = router //导出路由实例