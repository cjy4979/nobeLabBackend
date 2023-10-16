/**
 * @name 科研团队
 */
const { query } = require("../../db/query")
//获取教师列表
exports.getTeachers = async (req, res, next) => {
    try {
        const sql_cn = `SELECT id,uid,name,proTitle,title,education,researchDirection,email,imgpath FROM teachers_cn`
        const sql_en = `SELECT id,uid,name,proTitle,title,education,researchDirection,email,imgpath FROM teachers_en`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        const mergedData = data_cn.map((itemCn) => {
            const matchingEn = data_en.find((itemEn) => itemEn.uid === itemCn.uid);
            return { uid: itemCn.uid, cn: itemCn, en: matchingEn };
        });
        return res.status(200).send({
            status: 200,
            success: true,
            data: mergedData,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//根据职称获取教师列表
exports.getTeachersByTitle = async (req, res, next) => {
    try {
        const { title } = req.query
        const sql_cn = `SELECT id,uid,name,proTitle,title,education,researchDirection,email,imgpath FROM teachers_cn WHERE title='${title}'`
        const sql_en = `SELECT id,uid,name,proTitle,title,education,researchDirection,email,imgpath FROM teachers_en WHERE title='${title}'`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        const mergedData = data_cn.map((itemCn) => {
            const matchingEn = data_en.find((itemEn) => itemEn.uid === itemCn.uid);
            return { uid: itemCn.uid, cn: itemCn, en: matchingEn };
        });
        return res.status(200).send({
            status: 200,
            success: true,
            data: mergedData,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//获取教师详细信息
exports.getTeacherByUid = async (req, res, next) => {
    try {
        const { uid } = req.query
        const sql_cn = `SELECT * FROM teachers_cn WHERE uid = '${uid}'`
        const sql_en = `SELECT * FROM teachers_en WHERE uid = '${uid}'`
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

//获取学生列表
exports.getStudents = async (req, res, next) => {
    try {
        const sql_cn = `SELECT * FROM students_cn`
        const sql_en = `SELECT * FROM students_en`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        const mergedData = data_cn.map((itemCn) => {
            const matchingEn = data_en.find((itemEn) => itemEn.uid === itemCn.uid);
            return { uid: itemCn.uid, cn: itemCn, en: matchingEn };
        });
        return res.status(200).send({
            status: 200,
            success: true,
            data: mergedData,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//获取过往成员列表
exports.getGraduated = async (req, res, next) => {
    try {
        const sql_cn = `SELECT * FROM graduated_cn`
        const sql_en = `SELECT * FROM graduated_en`
        const data_cn = await query(sql_cn)
        const data_en = await query(sql_en)
        const mergedData = data_cn.map((itemCn) => {
            const matchingEn = data_en.find((itemEn) => itemEn.uid === itemCn.uid);
            return { uid: itemCn.uid, cn: itemCn, en: matchingEn };
        });
        return res.status(200).send({
            status: 200,
            success: true,
            data: mergedData,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}