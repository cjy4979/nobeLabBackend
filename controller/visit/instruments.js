/**
 * @name 仪器设备信息管理
 */
const { query } = require("../../db/query")

/**
 * 仪器设备图片
 */

//获取仪器设备图片
exports.getInstrument = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='instrument' AND isShow = 1 ORDER BY id DESC`
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


//获取仪器设备简介
exports.getInstrumentIntro = async (req, res, next) => {
    try {
        const sql_cn = `SELECT * FROM displaytext_cn WHERE name='instrumentIntro'`
        const sql_en = `SELECT * FROM displaytext_en WHERE name='instrumentIntro'`
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