/**
 * @name 科研团队
 */

const { query, queryData } = require("../../db/query")

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
        const sql_cn = `SELECT id,uid,name,proTitle,title,education,researchDirection,email,imgpath FROM teachers_cn WHERE title='${title}' ORDER BY id DESC`
        const sql_en = `SELECT id,uid,name,proTitle,title,education,researchDirection,email,imgpath FROM teachers_en WHERE title='${title}' ORDER BY id DESC`
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
        next(error)
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

//添加老师
exports.addTeacher = async (req, res, next) => {
    try {
        const { teacher_cn, teacher_en } = req.body
        const sql_cn = `INSERT INTO teachers_cn SET ?`
        const sql_en = `INSERT INTO teachers_en SET ?`
        await queryData(sql_cn, teacher_cn)
        await queryData(sql_en, teacher_en)
        return res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//更新老师信息
exports.updateTeacher = async (req, res, next) => {
    try {
        const { uid, teacher_cn, teacher_en } = req.body
        const sql_cn = `UPDATE teachers_cn SET ? WHERE uid='${uid}'`
        const sql_en = `UPDATE teachers_en SET ? WHERE uid='${uid}'`
        await queryData(sql_cn, teacher_cn)
        await queryData(sql_en, teacher_en)
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

//删除老师
exports.deleteTeacherByUid = async (req, res, next) => {
    try {
        const { uid } = req.query
        const sql_cn = `DELETE FROM teachers_cn WHERE uid='${uid}'`
        const sql_en = `DELETE FROM teachers_en WHERE uid='${uid}'`
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

//添加学生
exports.addStudent = async (req, res, next) => {
    try {
        const { student_cn, student_en } = req.body
        const sql_cn = `INSERT INTO students_cn SET ?`
        const sql_en = `INSERT INTO students_en SET ?`
        await queryData(sql_cn, student_cn)
        await queryData(sql_en, student_en)
        return res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//更新学生信息
exports.updateStudent = async (req, res, next) => {
    try {
        console.log(req.body);
        const { uid, student_cn, student_en } = req.body
        const sql_cn = `UPDATE students_cn SET ? WHERE uid='${uid}'`
        const sql_en = `UPDATE students_en SET ? WHERE uid='${uid}'`
        await queryData(sql_cn, student_cn)
        await queryData(sql_en, student_en)
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

//删除学生
exports.deleteStudentByUid = async (req, res, next) => {
    try {
        const { uid } = req.query
        const sql_cn = `DELETE FROM students_cn WHERE uid='${uid}'`
        const sql_en = `DELETE FROM students_en WHERE uid='${uid}'`
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

//添加过往成员
exports.addGraduated = async (req, res, next) => {
    try {
        const { graduated_cn, graduated_en } = req.body
        const sql_cn = `INSERT INTO graduated_cn SET ?`
        const sql_en = `INSERT INTO graduated_en SET ?`
        await queryData(sql_cn, graduated_cn)
        await queryData(sql_en, graduated_en)
        return res.status(200).send({
            status: 200,
            success: true,
            msg: 'ok'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//更新过往成员信息
exports.updateGraduated = async (req, res, next) => {
    try {
        const { uid, graduated_cn, graduated_en } = req.body
        const sql_cn = `UPDATE graduated_cn SET ? WHERE uid='${uid}'`
        const sql_en = `UPDATE graduated_en SET ? WHERE uid='${uid}'`
        await queryData(sql_cn, graduated_cn)
        await queryData(sql_en, graduated_en)
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

//删除过往成员
exports.deleteGraduatedByUid = async (req, res, next) => {
    try {
        const { uid } = req.query
        const sql_cn = `DELETE FROM graduated_cn WHERE uid='${uid}'`
        const sql_en = `DELETE FROM graduated_en WHERE uid='${uid}'`
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
