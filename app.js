const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require("mysql")
const router = require('./routers')

const multer = require('multer');
const path = require('path');
const auth = require('./middleWare/auth')
// const options = {
//     pfx: fs.readFileSync('./ssl/minback.shenyudebate.online.pfx'),
//     passphrase: 'Xx0!raK$I2qvoxHt'
// };

const app = express()

app.use(morgan('dev'))
app.use(cors())

//解析
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
    res.send('received')
})


//挂载路由
app.use('/', router)

// const server = https.createServer(options, app);

// server.listen(5071, () => {
//     console.log("express server running ar http://127.0.0.1:5071")
// })

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

// 处理图片上传
app.post('/uploadPic', upload.single('image'), auth, (req, res) => {
    const imagePath = '/api' + req.file.path;
    // 返回图片信息
    res.json({
        errno: 0, // 0 表示上传成功
        data: {
            url: imagePath, // 图片URL 
            alt: '图片描述', // 图片描述，可选
            href: '', // 图片链接，可选
        },
    });
});

//测试环境

app.listen(8088, () => {
    console.log("express server running ar http://127.0.0.1:8088")
})

// app.listen(5072, () => {
//     console.log("express server running ar http://127.0.0.1:5072")
// })
//生产环境
