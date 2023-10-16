/**
 * @name 管理员-实验室简介
 */
const express = require('express')
const router = express.Router()
const intro = require('../../controller/admin/intro')
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
const baseUrl = '/intro'

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

//获取实验室简介
router.get(baseUrl + '/getIntro', intro.getIntro)

//添加实验室简介
router.post(baseUrl + '/addIntro', auth, intro.addIntro)

//更新实验室简介
router.post(baseUrl + '/updateIntro', auth, intro.updateIntro)

//添加实验室图片
router.post(baseUrl + '/addIntroImages', auth, intro.addIntroImages)

//获取实验室图片
router.get(baseUrl + '/getIntroImages', intro.getIntroImages)

//更新实验室图片
router.post(baseUrl + '/updateIntroImages', auth, intro.updateIntroImages)

//删除实验室图片
router.delete(baseUrl + '/deleteIntroImages', auth, intro.deleteIntroImages)

module.exports = router //导出路由实例