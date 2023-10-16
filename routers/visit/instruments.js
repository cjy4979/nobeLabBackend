/**
 * @name 访客仪器设备
 */

const express = require('express')
const router = express.Router()
const instruments = require('../../controller/visit/instruments')

//
const baseUrl = '/instruments'

//获取仪器设备图
router.get(baseUrl + '/getInstruments', instruments.getInstrument)

//获取仪器设备简介
router.get(baseUrl + '/gettInstrumentIntro', instruments.getInstrumentIntro)


module.exports = router //导出路由实例