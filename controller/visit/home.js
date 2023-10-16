/**
 * @name 首页信息管理模块
 */
const { query } = require("../../db/query")

//获取走马灯图片
exports.getCarousel = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='carousel' AND isShow = 1`
        const data = await query(sql)
        return res.status(200).send({
            status: 200,
            success: true,
            data: data,
            msg: 'ok'
        })
    } catch (error) {
        console.log(data);
        next(error)
    }
}

//获取简介
exports.getIntro = async (req, res, next) => {
    try {
        const sql_cn = `SELECT * FROM displaytext_cn WHERE name='homeIntro'`
        const sql_en = `SELECT * FROM displaytext_en WHERE name='homeIntro'`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        return res.status(200).send({
            status: 200,
            success: true,
            data: {
                cn: data_cn[0],
                en: data_en[0]
            },
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//获取news列表（最近5条记录）
exports.getNewsList = async (req, res, next) => {
    try {
        const sql_cn = `SELECT id, paperId, title, createdAt FROM news_cn ORDER BY createdAt DESC LIMIT 5`
        const sql_en = `SELECT id, paperId, title, createdAt FROM news_en ORDER BY createdAt DESC LIMIT 5`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        return res.status(200).send({
            status: 200,
            success: true,
            data: {
                cn: data_cn,
                en: data_en
            },
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//获取招聘列表
exports.getRecruitList = async (req, res, next) => {
    try {
        const sql_cn = `SELECT id, type, title, createdAt FROM recruit_cn ORDER BY createdAt DESC`
        const sql_en = `SELECT id, type, title, createdAt FROM recruit_en ORDER BY createdAt DESC`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        return res.status(200).send({
            status: 200,
            success: true,
            data: {
                cn: data_cn,
                en: data_en
            },
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//科研成果图
exports.getAchievementsPic = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='achievement'`
        const data = await query(sql)
        return res.status(200).send({
            status: 200,
            success: true,
            data: data,
            msg: 'ok'
        })
    } catch (error) {
        console.log(data);
        next(error)
    }
}
