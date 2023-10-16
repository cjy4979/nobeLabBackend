/**
 * @name 招聘
 */

const { query } = require("../../db/query")

//获取招聘列表
exports.getRecruitList = async (req, res, next) => {
    try {
        const sql_cn = `SELECT id,title,createdAt,type FROM recruit_cn ORDER BY createdAt DESC`
        const sql_en = `SELECT id,title,createdAt,type FROM recruit_en ORDER BY createdAt DESC`
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
exports.getRecruitByType = async (req,res,next)=>{
    try {
        const {type} = req.query
        const sql_cn = `SELECT * FROM recruit_cn WHERE type='${type}'`
        const sql_en = `SELECT * FROM recruit_en WHERE type='${type}'`
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
        next(error);
    }
}