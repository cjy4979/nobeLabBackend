/**
 * @name 管理员-科研团队
 */

const express = require('express')
const router = express.Router()
const teams = require('../../controller/admin/teams')
const auth = require('../../middleWare/auth')
const uploadPic = require('../../middleWare/uploadPic')
const multer = require('multer');

// 设置文件存储目录和文件名生成规则
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 存储目录
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 文件名
    },
});

const upload = multer({ storage: storage });

//
const baseUrl = '/teams'

//图片处理
router.post(baseUrl + '/image',
    auth,
    upload.single('image'),
    async (req, res, next) => {
        try {
            console.log(req.file);
            const imagePath = '/api/' + req.file.path;
            // 返回图片信息
            res.status(200).send({
                success: true,
                errno: 0, // 0 表示上传成功
                data: {
                    url: imagePath, // 图片URL  
                    alt: '图片描述', // 图片描述，可选
                    href: '', // 图片链接，可选,
                    imageName: req.file.originalname
                },
            });
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
)

//获取老师列表
router.get(baseUrl + '/getTeachers', teams.getTeachers)

//根据职称获取老师列表
router.get(baseUrl + '/getTeachersByTitle', teams.getTeachersByTitle)

//获取老师详细介绍
router.get(baseUrl + '/getTeacherByUid', teams.getTeacherByUid)

//添加老师
router.post(baseUrl + '/addTeacher', auth, teams.addTeacher)

//更新老师信息
router.post(baseUrl + '/updateTeacher', auth, teams.updateTeacher)

//删除老师信息
router.delete(baseUrl + '/deleteTeacherByUid', auth, teams.deleteTeacherByUid)

//获取学生列表
router.get(baseUrl + '/getStudents', teams.getStudents)

//添加学生
router.post(baseUrl + '/addStudent', auth, teams.addStudent)

//更新学生信息
router.post(baseUrl + '/updateStudent', auth, teams.updateStudent)

//删除学生信息
router.delete(baseUrl + '/deleteStudentByUid', auth, teams.deleteStudentByUid)

//获取过往学生列表
router.get(baseUrl + '/getGraduated', teams.getGraduated)

//添加过往学生
router.post(baseUrl + '/addGraduated', auth, teams.addGraduated)

//更新过往学生信息
router.post(baseUrl + '/updateGraduated', auth, teams.updateGraduated)

//删除过往学生信息
router.delete(baseUrl + '/deleteGraduatedByUid', auth, teams.deleteGraduatedByUid)


module.exports = router //导出路由实例