/**
 * @name 仪器设备信息管理
 */
const { query, queryData } = require("../../db/query")

/**
 * 需要修改仪器设备的图片、仪器设备简介即可
 * 仪器设备的图片有增删改查，其中改是改的图片可见和图片名称
 * 仪器设备简介只能有一条，0条时可增，一条时只能改，不可删
 */

/**
 * 仪器设备图片
 */

//获取仪器设备图片
exports.getInstrument = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='instrument' ORDER BY id DESC`
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

//添加图片
exports.addInstrument = async (req, res, next) => {
    try {
        const sql = `INSERT INTO images SET ?`
        await queryData(sql, req.body)
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

//更新仪器设备
exports.updateInstrument = async (req, res, next) => {
    try {
        const data = req.body
        const sql = `UPDATE images SET ? WHERE picId = '${req.body.picId}'`
        const sqlData = await queryData(sql, data)
        return res.status(200).send({
            stauts: 200,
            success: true,
            data: sqlData,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//删除图片
exports.deleteInstrument = async (req, res, next) => {
    try {
        const sql = `DELETE FROM images WHERE picId = '${req.query.picId}'`
        await query(sql)
        res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
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

//更新仪器设备简介
exports.updateInstrumentIntro = async (req, res, next) => {
    try {
        const { intro_cn, intro_en } = req.body
        console.log(req.body);
        const selectSql_cn = `SELECT * FROM displaytext_cn WHERE name='instrumentIntro'`;
        const selectSql_en = `SELECT * FROM displaytext_en WHERE name='instrumentIntro'`;

        const existingIntro_cn = await queryData(selectSql_cn);
        const existingIntro_en = await queryData(selectSql_en);

        // 如果 "instrumentIntro" 行不存在，创建一行
        if (existingIntro_cn.length === 0) {
            const insertSql_cn = `INSERT INTO displaytext_cn SET ?`;
            await queryData(insertSql_cn, { name: 'instrumentIntro', text: intro_cn });
        } else {
            // 如果 "instrumentIntro" 行存在，更新该行
            const updateSql_cn = `UPDATE displaytext_cn SET text = ? WHERE name='instrumentIntro'`;
            await queryData(updateSql_cn, intro_cn);
        }

        if (existingIntro_en.length === 0) {
            const insertSql_en = `INSERT INTO displaytext_en SET ?`;
            await queryData(insertSql_en, { name: 'instrumentIntro', text: intro_en });
        } else {
            const updateSql_en = `UPDATE displaytext_en SET text = ? WHERE name='instrumentIntro'`;
            await queryData(updateSql_en, intro_en);
        }
        return res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//添加仪器设备简介
exports.addInstrumentIntro = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM displaytext_cn WHERE name = 'instrumentIntro'`
        const data = await query(sql)
        if (data) {
            return res.status(423).send({
                status: 423,
                success: false,
                msg: '简介已存在，禁止添加！'
            })
        }
        const { intro_cn, intro_en } = req.body
        const sql_cn = `INSERT INTO displaytext_cn SET ?`
        const sql_en = `INSERT INTO displaytext_en SET ?`
        await queryData(sql_cn, intro_cn)
        await queryData(sql_en, intro_en)
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