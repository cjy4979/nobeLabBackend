/**
 * @name 仪器设备管理
 */

const express = require('express')
const router = express.Router()
const instruments = require('../../controller/admin/instruments')
const auth = require('../../middleWare/auth')
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
const baseUrl = '/instruments'

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
router.post(baseUrl + '/addInstruments', auth, instruments.addInstrument);

//获取走马灯
router.get(baseUrl + '/getInstruments', instruments.getInstrument)

//更新走马灯
router.post(baseUrl + '/updateInstruments', auth, instruments.updateInstrument)

//删除走马灯
router.delete(baseUrl + '/deleteInstruments', auth, instruments.deleteInstrument)

//获取实验室简介
router.get(baseUrl + '/getInstrumentIntro', instruments.getInstrumentIntro)

//更新实验室简介
router.post(baseUrl + '/updateInstrumentIntro', auth, instruments.updateInstrumentIntro)

//添加实验室简介
router.post(baseUrl + '/addInstrumentIntro', auth, instruments.addInstrumentIntro)

module.exports = router //导出路由实例