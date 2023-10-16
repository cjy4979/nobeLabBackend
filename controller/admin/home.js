/**
 * @name 首页展示信息管理
 */
const { query, queryData } = require("../../db/query")

/**
 * 首页当前只需要修改走马灯的图片、实验室简介和科研成果展示图片即可
 * 走马灯的图片有增删改查，其中改是改的图片可见和图片名称
 * 实验室简介只能有一条，0条时可增，一条时只能改，不可删
 * 科研成果同走马灯
 */

/**
 * 走马灯图片
 */

//获取走马灯图片
exports.getCarousel = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM images WHERE type='carousel' ORDER BY id DESC`
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
exports.addCarousel = async (req, res, next) => {
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

//更新走马灯
exports.updateCarousel = async (req, res, next) => {
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
exports.deleteCarousel = async (req, res, next) => {
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

//获取实验室简介
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

//更新实验室简介
exports.updateIntro = async (req, res, next) => {
    try {
        const { intro_cn, intro_en } = req.body
        console.log(req.body);
        const selectSql_cn = `SELECT * FROM displaytext_cn WHERE name='homeIntro'`;
        const selectSql_en = `SELECT * FROM displaytext_en WHERE name='homeIntro'`;

        const existingIntro_cn = await queryData(selectSql_cn);
        const existingIntro_en = await queryData(selectSql_en);

        // 如果 "homeIntro" 行不存在，创建一行
        if (existingIntro_cn.length === 0) {
            const insertSql_cn = `INSERT INTO displaytext_cn SET ?`;
            await queryData(insertSql_cn, { name: 'homeIntro', text: intro_cn });
        } else {
            // 如果 "homeIntro" 行存在，更新该行
            const updateSql_cn = `UPDATE displaytext_cn SET text = ? WHERE name='homeIntro'`;
            await queryData(updateSql_cn, intro_cn);
        }

        if (existingIntro_en.length === 0) {
            const insertSql_en = `INSERT INTO displaytext_en SET ?`;
            await queryData(insertSql_en, { name: 'homeIntro', text: intro_en });
        } else {
            const updateSql_en = `UPDATE displaytext_en SET text = ? WHERE name='homeIntro'`;
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

//添加实验室简介
exports.addIntro = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM displaytext_cn WHERE name = 'homeIntro'`
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

//添加图片
exports.addAchievementsPic = async (req, res, next) => {
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

//更新走马灯
exports.updateAchievementsPic = async (req, res, next) => {
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
exports.deleteAchievementsPic = async (req, res, next) => {
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
