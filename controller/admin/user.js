/**
 * @name 管理员用户模块
 */
const { query } = require("../../db/query")
const md5 = require('../../util/md5')
const jwt = require('../../util/jwt')
const {
    jwtSecret
} = require('../../config/config.default')

//用户注册
exports.register = async (req, res, next) => {
    try {
        const {
            username,
            password,
        } = req.body
        //const uid = timestamp.toString() + username.substr(5, 6)
        const sql = `INSERT INTO users (username, password) values ('${username}','${md5(password)}')`
        const data = await query(sql)
        if (!data) {
            //Promise.reject('注册失败')
            res.status(400).send({
                status: 400,
                msg: '注册失败',
                verified: req.verified
            })
            return
        }
        res.status(200).send({
            msg: '注册成功',
            data: {
                username: username,
                password: password
            },
            verified: req.verified
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

//用户登录
exports.login = async (req, res, next) => {
    try {
        const {
            username,
            password
        } = req.body
        console.log(req.body);
        const sql = `SELECT * FROM users WHERE username = '${username}' && password ='${md5(password)}'`
        const data = await query(sql)
        if (data.length === 0) {
            res.status(400).json({
                status: 400,
                msg: '用户名或密码错误'
            })
            return
        }
        const token = await jwt.sign({
            username: username
        }, jwtSecret, {
            expiresIn: "72h" //72小时过期
        })

        res.status(200).json({
            msg: '登录成功',
            success: true,
            token
        })
    } catch (err) {
        next(err)
    }
}


//退出登录
exports.logout = async (req, res, next) => {
    try {
        //console.log(req.session);
        //req.session.destroy()
        res.status(200).send({
            status: 200,
            msg: 'ok',
            success: true
        });
    } catch (err) {
        next(err)
    }
}

//更新密码
exports.putPassword = async (req, res, next) => {
    try {
        const {
            key,
            password
        } = req.body
        const sql = `UPDATE users SET password='${md5(password)}' WHERE key = '${key}'`
        const data = await query(sql)
        if (!data) {
            res.status(400).send({
                status: 400,
                msg: '更改失败',
                success: false
            })
            return
        }
        res.status(200).send({
            success: true,
            msg: '成功'
        })
    } catch (err) {
        next(err)
    }
}

// //忘记密码
// exports.forgetPassword = async (req, res, next) => {
//   res.send(req.body)
// }