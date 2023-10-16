/**
 * @name 首页信息管理
 */

const express = require('express')
const router = express.Router()
const home = require('../../controller/admin/home')
const auth = require('../../middleWare/auth')
const multer = require('multer');
const { queryData } = require('../../db/query');

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
const baseUrl = '/home'

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

//上传走马灯图片
router.post(baseUrl + '/addCarousel', auth, home.addCarousel);

//获取走马灯
router.get(baseUrl + '/getCarousel', home.getCarousel)

//更新走马灯
router.post(baseUrl + '/updateCarousel', auth, home.updateCarousel)

//删除走马灯
router.delete(baseUrl + '/deleteCarousel', auth, home.deleteCarousel)

//上传科研成果图片
router.post(baseUrl + '/addAchievementsPic', auth, home.addAchievementsPic);

//获取科研成果图
router.get(baseUrl + '/getAchievementsPic', home.getAchievementsPic)

//更新科研成果图
router.post(baseUrl + '/updateAchievementsPic', auth, home.updateAchievementsPic)

//删除科研成果图
router.delete(baseUrl + '/deleteAchievementsPic', auth, home.deleteAchievementsPic)

//获取实验室简介
router.get(baseUrl + '/getIntro', home.getIntro)

//更新实验室简介
router.post(baseUrl + '/updateIntro', auth, home.updateIntro)

//添加实验室简介
router.post(baseUrl + '/addIntro', auth, home.addIntro)

module.exports = router //导出路由实例