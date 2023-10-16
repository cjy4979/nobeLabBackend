/**
 * @name 新闻
 */

const { query, queryData } = require('../../db/query')

//获取新闻列表
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

//获取新闻文案
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
        next(error);
    }
}

//更新新闻文案
exports.updateNewsByPaperId = async (req, res, next) => {
    try {
        const { paperId, news_cn, news_en } = req.body
        const sql_cn = `UPDATE news_cn SET ? WHERE paperId='${paperId}'`
        const sql_en = `UPDATE news_en SET ? WHERE paperId='${paperId}'`
        await queryData(sql_cn, news_cn)
        await queryData(sql_en, news_en)
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

//添加新闻文案
exports.addNewsByPaperId = async (req, res, next) => {
    try {
        const { news_cn, news_en } = req.body
        const sql_cn = `INSERT INTO news_cn SET ?`
        const sql_en = `INSERT INTO news_en SET ?`
        await queryData(sql_cn, news_cn)
        await queryData(sql_en, news_en)
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

//删除新闻
exports.deleteNewsByPaperId = async (req, res, next) => {
    try {
        const { paperId } = req.query
        const sql_cn = `DELETE FROM news_cn WHERE paperId='${paperId}'`
        const sql_en = `DELETE FROM news_cn WHERE paperId='${paperId}'`
        await query(sql_cn)
        await query(sql_en)
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