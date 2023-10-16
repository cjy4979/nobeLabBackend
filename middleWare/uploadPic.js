const queryData = require('../db/query')
const multer = require('multer');
const path = require('path');

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

module.exports = async (req, res, next) => {
    try {
        const imagePath = '/api'+req.file.path;
        upload.single('image')(req, res, (err) => {
            if (err) { 
              return res.status(400).json({ message: 'File upload failed' });
            }
        
            if (!req.file) {
              return res.status(400).json({ message: 'No file uploaded' });
            }
        
            const imageUrl = `/uploads/${req.file.filename}`;
            const imageName = req.file.originalname;
        
            const sql = 'INSERT INTO images (url, image_name) VALUES (?, ?)';
            queryData(sql, [imageUrl, imageName], (dbError) => {
              if (dbError) {
                console.error('Error inserting data into MySQL: ' + dbError);
                return res.status(500).json({ message: 'Internal Server Error' });
              }
        
              // 将图片URL和名称添加到请求对象中
              req.uploadedImageUrl = imageUrl;
              req.uploadedImageName = imageName;
        
              next();
            });
          });
    } catch (error) {
        console.log(error);
        next(error)
    }
    
  };
  