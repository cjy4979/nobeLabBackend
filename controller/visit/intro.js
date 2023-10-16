/**
 * @name 实验室简介
 */
const { query } = require("../../db/query")

//获取简介展示的图片
exports.getIntroImages = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='intro'`
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
        const sql_cn = `SELECT * FROM displaytext_cn WHERE name='intro'`
        const sql_en = `SELECT * FROM displaytext_en WHERE name='intro'`
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
