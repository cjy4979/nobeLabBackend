/**
 * @name 招聘
 */

const { query, queryData } = require('../../db/query')

//获取招聘列表
exports.getRecruitList = async (req, res, next) => {
    try {
        const sql_cn = `SELECT id, title,createdAt,type FROM recruit_cn ORDER BY createdAt DESC`
        const sql_en = `SELECT id, title,createdAt,type FROM recruit_en ORDER BY createdAt DESC`
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

//获取招聘文案
exports.getRecruitByType = async (req, res, next) => {
    try {
        const { type } = req.query
        const sql_cn = `SELECT * FROM recruit_cn WHERE type='${type}'`
        const sql_en = `SELECT * FROM recruit_en WHERE type='${type}'`
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
        next(error);
    }
}

//更新招聘文案
exports.updateRecruitByType = async (req, res, next) => {
    try {
        const { type, recruit_cn, recruit_en } = req.body
        const sql_cn = `INSERT INTO recruit_cn (type, text, title) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE text = VALUES(text), title = VALUES(title)`;
        const sql_en = `INSERT INTO recruit_en (type, text, title) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE text = VALUES(text), title = VALUES(title)`;
        await queryData(sql_cn, [type, recruit_cn.text, recruit_cn.title])
        await queryData(sql_en, [type, recruit_en.text, recruit_en.title])
        return res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//添加招聘文案
exports.addRecruitByType = async (req, res, next) => {
    try {
        const { recruit_cn, recruit_en } = req.body
        const sql_cn = `INSERT INTO recruit_cn SET ?`
        const sql_en = `INSERT INTO recruit_en SET ?`
        await queryData(sql_cn, recruit_cn)
        await queryData(sql_en, recruit_en)
        return res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}