/**
 * @name 新闻
 */

const { query } = require("../../db/query")

//获取news列表
exports.getNewsList = async (req, res, next) => {
    try {
        const { current, pageSize } = req.query
        const countSql_cn = `SELECT COUNT(*) as total FROM news_cn`;
        const countSql_en = `SELECT COUNT(*) as total FROM news_en`;

        const [countResult_cn, countResult_en] = await Promise.all([
            query(countSql_cn),
            query(countSql_en)
        ]);

        const total_cn = countResult_cn[0].total;
        const total_en = countResult_en[0].total;
        const sql_cn = `SELECT id,paperId,title,createdAt FROM news_cn ORDER BY createdAt DESC LIMIT ${(current - 1) * pageSize} , ${pageSize}`
        const sql_en = `SELECT id,paperId,title,createdAt FROM news_en ORDER BY createdAt DESC LIMIT ${(current - 1) * pageSize} , ${pageSize}`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        return res.status(200).send({
            status: 200,
            success: true,
            data: {
                cn: data_cn,
                en: data_en,
                total: total_cn
            },
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//获取新闻详情
exports.getNewsByPaperId = async (req, res, next) => {
    try {
        const { paperId } = req.query
        const sql_cn = `SELECT * FROM news_cn WHERE paperId='${paperId}'`
        const sql_en = `SELECT * FROM news_en WHERE paperId='${paperId}'`
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

//----------------------------------

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

//科研成果图
exports.getAchievementsPic = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='achievements'`
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
