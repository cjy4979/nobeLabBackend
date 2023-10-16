const jwt = require('jsonwebtoken')
const {promisify} = require('util')//用于创建promise

//生成jwt
exports.sign = promisify(jwt.sign)

//验证jwt
exports.verify = promisify(jwt.verify)

//仅仅解析不进行验证
exports.decode = promisify(jwt.decode)