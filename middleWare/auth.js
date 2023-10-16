const {verify} = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')


module.exports = async(req,res,next)=>{
    // 从请求头中获取token
    let token = req.headers['authorization']//token在请求头中的格式为 authorization: Bearer+一个空格+token值
    token = token
        ? token.split('Bearer ')[1]
        : null
    if(!token){
        return res.status(401).json({
            status:401,
            msg:'用户未登录或凭证过期'
        })
    }
    // 验证token是否有效

    try {
        const decodedToken = await verify(token, jwtSecret);
        req.name = decodedToken.name;
        next(); // 继续执行
    } catch (err) {
        return res.status(401).json({
            status: 401,
            msg: '用户未登录'
        }); // 无效--->响应 401 状态码
    }
}